import { AsyncStorage } from 'react-native';

export function getUser() {
    return AsyncStorage.getItem('user')
    .then(user => {

        return JSON.parse(user);
    });
}

export function setUser(userInfo) {
    return AsyncStorage.setItem('user', JSON.stringify(userInfo));
}

export function unsetUser() {
    return AsyncStorage.removeItem('user');
}
