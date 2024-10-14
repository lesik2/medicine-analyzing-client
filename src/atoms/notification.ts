import { atom } from "jotai";

interface NotificationProps{
    title: string;
    message: string;
    badge: 'positive-checkmark'| 'negative-cross',
    visible: boolean
}

export const notificationAtom = atom<NotificationProps>({
    title: '',
    message: '',
    badge: 'positive-checkmark',
    visible: false,
});

export const closeNotificationAtom = atom(null, (_get, set) => {
    set(notificationAtom, {
        title: '',
        message: '',
        badge: 'positive-checkmark',
        visible: false,
    });
});

export const showNotificationAtom = atom(null, (_get, set, payload: Omit<NotificationProps,'visible'>) => {
    set(notificationAtom, {
        title: payload.title,
        message: payload.message,
        badge: payload.badge,
        visible: true,
    });
});