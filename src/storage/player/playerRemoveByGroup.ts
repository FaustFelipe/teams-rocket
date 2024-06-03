import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from '@storage/storage.config';
import { playerGetByGroup } from './playerGetByGroup';

export async function playerRemoveByGroup(playerName: string, group: string) {
    try {
        const stored = await playerGetByGroup(group);
        const filter = stored.filter(player => player.name !== playerName);
        const players = JSON.stringify(filter);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
    } catch (error) {
        throw error;
    }
}