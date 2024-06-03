import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION, GROUP_COLLECTION } from '@storage/storage.config';
import { groupsGetAll } from './groupsGetAll';

export async function groupRemoveByName(groupToRemove: string) {
    try {
        const storedGroups = await groupsGetAll();
        const groups = storedGroups.filter(group => groupToRemove !== group);

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupToRemove}`);
    } catch (error) {
        throw error;
    }
}