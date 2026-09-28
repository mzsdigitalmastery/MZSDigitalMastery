import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db, testFirestoreConnection } from './config';
export { testFirestoreConnection };
import { Resource, ResourceRequest, FilterState } from '../types';
import { INITIAL_RESOURCES } from './seedData';

const RESOURCES_COLLECTION = 'resources';
const REQUESTS_COLLECTION = 'resource_requests';

// Check if resources exist; if not, seed with initial verified data
export async function seedResourcesIfEmpty(): Promise<number> {
  try {
    const collRef = collection(db, RESOURCES_COLLECTION);
    const snap = await getDocs(query(collRef, limit(1)));
    if (!snap.empty) {
      return 0; // Already seeded
    }

    const batch = writeBatch(db);
    for (const res of INITIAL_RESOURCES) {
      const newDocRef = doc(collRef);
      batch.set(newDocRef, {
        ...res,
        id: newDocRef.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    await batch.commit();
    return INITIAL_RESOURCES.length;
  } catch (err) {
    console.warn('Auto-seed bypassed or handled:', err);
    return 0;
  }
}

// Fetch all resources with optional status
export async function getResources(includeDrafts = false): Promise<Resource[]> {
  try {
    const collRef = collection(db, RESOURCES_COLLECTION);
    let q = query(collRef);
    if (!includeDrafts) {
      q = query(collRef, where('status', '==', 'published'));
    }
    const snap = await getDocs(q);
    const results: Resource[] = [];
    snap.forEach((d) => {
      results.push({ ...(d.data() as Resource), id: d.id });
    });

    // If Firestore is completely fresh and unseeded, fallback to initial verified data for zero blank screens
    if (results.length === 0 && !includeDrafts) {
      // Trigger background seed
      seedResourcesIfEmpty().catch(() => {});
      return INITIAL_RESOURCES.map((r, i) => ({ ...r, id: `seed-${i}` })) as Resource[];
    }

    return results;
  } catch (error) {
    console.error('Error fetching resources from Firestore:', error);
    // Return initial verified data so UI stays functional
    return INITIAL_RESOURCES.map((r, i) => ({ ...r, id: `seed-${i}` })) as Resource[];
  }
}

// Get resource by Slug
export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  try {
    const collRef = collection(db, RESOURCES_COLLECTION);
    const q = query(collRef, where('slug', '==', slug), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const docSnap = snap.docs[0];
      return { ...(docSnap.data() as Resource), id: docSnap.id };
    }
  } catch (err) {
    console.error('Error getting resource by slug:', err);
  }

  // Fallback to static seed
  const found = INITIAL_RESOURCES.find((r) => r.slug === slug);
  if (found) {
    return { ...found, id: `seed-${found.slug}` } as Resource;
  }
  return null;
}

// Create new resource (Admin)
export async function createResource(data: Omit<Resource, 'id'>): Promise<string> {
  const collRef = collection(db, RESOURCES_COLLECTION);
  const newDocRef = doc(collRef);
  const resourceData: Resource = {
    ...data,
    id: newDocRef.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await setDoc(newDocRef, resourceData);
  return newDocRef.id;
}

// Update existing resource (Admin)
export async function updateResource(id: string, data: Partial<Resource>): Promise<void> {
  const docRef = doc(db, RESOURCES_COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

// Delete resource (Admin)
export async function deleteResource(id: string): Promise<void> {
  const docRef = doc(db, RESOURCES_COLLECTION, id);
  await deleteDoc(docRef);
}

// Submit a new Resource Request
export async function submitResourceRequest(data: {
  name: string;
  email: string;
  resourceType: string;
  resourceName: string;
  description: string;
  preferredFormat?: string;
  referenceLink?: string;
  additionalNotes?: string;
}): Promise<string> {
  const collRef = collection(db, REQUESTS_COLLECTION);
  const newDocRef = doc(collRef);
  const reqData: ResourceRequest = {
    ...data,
    id: newDocRef.id,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  await setDoc(newDocRef, reqData);
  return newDocRef.id;
}

// Get all requests (Admin)
export async function getResourceRequests(): Promise<ResourceRequest[]> {
  try {
    const collRef = collection(db, REQUESTS_COLLECTION);
    const snap = await getDocs(query(collRef, limit(50)));
    const requests: ResourceRequest[] = [];
    snap.forEach((d) => {
      requests.push({ ...(d.data() as ResourceRequest), id: d.id });
    });
    return requests;
  } catch (err) {
    console.error('Error fetching resource requests:', err);
    return [];
  }
}

// Update Request Status (Admin)
export async function updateRequestStatus(
  id: string,
  status: 'pending' | 'in-review' | 'fulfilled' | 'declined'
): Promise<void> {
  const docRef = doc(db, REQUESTS_COLLECTION, id);
  await updateDoc(docRef, { status });
}
