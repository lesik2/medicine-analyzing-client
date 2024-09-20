
import { atomWithStorage } from 'jotai/utils';
import { StorageKeys } from '@/constants/localStorage';
import { AuthUser } from '@/types/auth';

export const authUserAtom = atomWithStorage<AuthUser|null>(
    StorageKeys.authUser,
    null
);

