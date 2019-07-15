import { AsyncStorage } from 'react-native';

export function getUser() {
    return AsyncStorage.getItem('user')
    .then(user => {
        return JSON.parse(user);
    });
}

export function setUser(userInfo) {
    console.log(typeof userInfo);
    return AsyncStorage.setItem('user', userInfo);
}

export function unsetUser() {
    return AsyncStorage.removeItem('user');
}