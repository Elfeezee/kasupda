
'use client';

// This file contains helpers to manage application data in localStorage.
// It's a client-side only solution for prototyping without a backend.

export interface StoredApplication {
    id: string;
    type: string;
    applicantName: string;
    date: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Processing';
    data: Record<string, any>;
}

const LOCAL_STORAGE_KEY = 'kasupda-applications';

/**
 * Retrieves all applications from localStorage.
 * This should only be called on the client-side.
 * @returns {StoredApplication[]} An array of stored applications.
 */
export function getApplications(): StoredApplication[] {
    if (typeof window === 'undefined') {
        return [];
    }
    try {
        const storedApplications = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedApplications ? JSON.parse(storedApplications) : [];
    } catch (error) {
        console.error("Failed to read applications from localStorage:", error);
        return [];
    }
}

/**
 * Retrieves a single application by its ID from localStorage.
 * @param {string} id The ID of the application to retrieve.
 * @returns {StoredApplication | null} The application object or null if not found.
 */
export function getApplicationById(id: string): StoredApplication | null {
    const applications = getApplications();
    const app = applications.find(app => app.id === id) || null;
    
    // Note: File objects cannot be stored in JSON. The data retrieved will not contain actual File objects.
    // This is a limitation of this prototype implementation.
    if (app) {
        console.log("Retrieved application:", app);
    }
    
    return app;
}


/**
 * Saves a new application to localStorage.
 * @param {Omit<StoredApplication, 'id' | 'date' | 'status'>} newApplication - The application data to save.
 */
export function saveApplication(newApplication: { type: string, applicantName: string, data: Record<string, any> }) {
    if (typeof window === 'undefined') {
        console.warn("Cannot save application: not in a browser environment.");
        return;
    }
    try {
        const applications = getApplications();
        const applicationToStore: StoredApplication = {
            ...newApplication,
            id: `APP-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
            date: new Date().toISOString(),
            status: 'Pending',
        };
        
        // We can't store File objects in JSON. We'll store their names for display purposes.
        // A real app would upload these files to a server.
        const serializableData = { ...applicationToStore.data };
        for (const key in serializableData) {
            if (serializableData[key] instanceof File) {
                 serializableData[key] = {
                    name: serializableData[key].name,
                    size: serializableData[key].size,
                    type: serializableData[key].type,
                    __isFile: true // Add a flag to identify it later if needed
                };
            }
            // Handle nested document objects
            if (typeof serializableData[key] === 'object' && serializableData[key] !== null) {
                for (const docKey in serializableData[key]) {
                     const docValue = serializableData[key][docKey];
                     if (docValue instanceof File) {
                         serializableData[key][docKey] = {
                             name: docValue.name,
                             size: docValue.size,
                             type: docValue.type,
                             __isFile: true
                         }
                     }
                }
            }
        }
        applicationToStore.data = serializableData;


        applications.unshift(applicationToStore); // Add new application to the beginning of the list
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(applications));
        
    } catch (error) {
        console.error("Failed to save application to localStorage:", error);
    }
}
