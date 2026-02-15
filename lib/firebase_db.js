import { db } from '@/firebase/config';
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';

// --- Subjects ---

export const addSubject = async (userId, subjectData) => {
    try {
        const docRef = await addDoc(collection(db, 'subjects'), {
            ...subjectData,
            userId,
            createdAt: serverTimestamp(),
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding subject: ", error);
        return { success: false, error };
    }
};

export const getSubjects = async (userId) => {
    try {
        const q = query(
            collection(db, 'subjects'),
            where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const subjects = [];
        querySnapshot.forEach((doc) => {
            subjects.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: subjects };
    } catch (error) {
        console.error("Error getting subjects: ", error);
        return { success: false, error };
    }
};

export const getSubjectById = async (subjectId) => {
    try {
        const docRef = doc(db, 'subjects', subjectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
        } else {
            return { success: false, error: 'Subject not found' };
        }
    } catch (error) {
        console.error("Error getting subject: ", error);
        return { success: false, error };
    }
};

export const deleteSubject = async (userId, subjectId) => {
    try {
        const subjectRef = doc(db, 'subjects', subjectId);
        // Get the subject first to verify ownership
        const subjectSnap = await getDoc(subjectRef);

        if (!subjectSnap.exists()) {
            return { success: false, error: "Subject not found" };
        }

        if (subjectSnap.data().userId !== userId) {
            return { success: false, error: "Unauthorized: You don't own this subject" };
        }

        await deleteDoc(subjectRef);
        return { success: true };
    } catch (error) {
        console.error("Error deleting subject: ", error);
        return { success: false, error: error.message };
    }
};

// --- Tasks ---

export const addTask = async (userId, taskData) => {
    try {
        const docRef = await addDoc(collection(db, 'tasks'), {
            ...taskData,
            userId,
            completed: false,
            createdAt: serverTimestamp(),
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding task: ", error);
        return { success: false, error };
    }
};

export const getTasks = async (userId) => {
    try {
        const q = query(
            collection(db, 'tasks'),
            where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const tasks = [];
        querySnapshot.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: tasks };
    } catch (error) {
        console.error("Error getting tasks: ", error);
        return { success: false, error };
    }
};

export const toggleTaskCompletion = async (taskId, currentStatus) => {
    try {
        const taskRef = doc(db, 'tasks', taskId);
        await updateDoc(taskRef, {
            completed: !currentStatus
        });
        return { success: true };
    } catch (error) {
        console.error("Error toggling task: ", error);
        return { success: false, error };
    }
};

export const deleteTask = async (taskId) => {
    try {
        await deleteDoc(doc(db, 'tasks', taskId));
        return { success: true };
    } catch (error) {
        console.error("Error deleting task: ", error);
        return { success: false, error };
    }
};

// --- Roadmaps ---

export const saveRoadmap = async (userId, roadmapData) => {
    try {
        const docRef = await addDoc(collection(db, 'roadmaps'), {
            ...roadmapData,
            userId,
            createdAt: serverTimestamp(),
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error saving roadmap: ", error);
        return { success: false, error };
    }
};

export const getRoadmaps = async (userId) => {
    try {
        const q = query(
            collection(db, 'roadmaps'),
            where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const roadmaps = [];
        querySnapshot.forEach((doc) => {
            roadmaps.push({ id: doc.id, ...doc.data() });
        });

        // Sort in memory to avoid needing a composite index immediately
        roadmaps.sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
            return dateB - dateA; // Descending
        });

        return { success: true, data: roadmaps };
    } catch (error) {
        console.error("Error getting roadmaps: ", error);
        return { success: false, error };
    }
};

export const updateRoadmap = async (roadmapId, updates) => {
    try {
        const docRef = doc(db, 'roadmaps', roadmapId);
        await updateDoc(docRef, updates);
        return { success: true };
    } catch (error) {
        console.error("Error updating roadmap: ", error);
        return { success: false, error: error.message };
    }
};
