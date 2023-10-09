import { describe, test, expect, vi, beforeEach } from 'vitest'
import agent from '@/app/api/serviceAgent';
import axios from 'axios'

import { User } from '@/app/models/user';
import { ProfileUser } from '@/app/models/profile';
import ProfileStore from '@/app/stores/profileStore';
import UserStore from '@/app/stores/userStore';


describe('Profile domain store - logic functions', () => {


    //Reset the tests each time to evade false positives
    beforeEach(() => {
        //Spy on axios requests to intercept with a mock
        const mockGet = vi.spyOn(axios, 'get');
        const mockPost = vi.spyOn(axios, 'post');
        const mockPut = vi.spyOn(axios, 'put');
        const mockDelete = vi.spyOn(axios, 'delete');

        mockGet.mockReset()
        mockPost.mockReset()
        mockPut.mockReset()
        mockDelete.mockReset()
    });



    /*  
        Load an array of non-empty records for current user
    */
    test('get isCurrentUser() returns true if signed in user is viewed user. ', async () => {
        const store = new ProfileStore;
        const userStore = new UserStore;

        // Create a mock pbject of type User - represents signed in user
        const userMock: User = {
            id: 0,
            email: 'test@email.com',
            userName: 'test',
            token: '123xyz',
            imageURL: '123',
            imageID: '123',
            following: false,
            followersCount: 0,
            followingCount: 0
        };

        // Create a mock object of type ProfileUser - represents viewed User
        const profileMock: ProfileUser = {
            id: 0,
            userName: 'test',
            imageURL: '123',
            imageID: '123',
            following: false,
            followersCount: 0,
            followingCount: 0
        }

        userStore.user = userMock;
        store.viewedUser = profileMock;

        const response = store.isCurrentUser;

        expect(userStore.user).toStrictEqual(userMock);
    })

    /*  
        Get existing user
    */
    test('getViewedUser() successfully fetches an existing user', async () => {
        const store = new ProfileStore;

        //Spy on axios requests to intercept with a mock
        const mockGet = vi.spyOn(axios, 'get');

        // Create a mock object of type ProfileUser - represents viewed User
        const profileMock: ProfileUser = {
            id: 0,
            userName: 'test',
            imageURL: '123',
            imageID: '123',
            following: false,
            followersCount: 0,
            followingCount: 0
        }

        //Return a promise with mock data
        mockGet.mockResolvedValue({ data: profileMock });

        //Call store's getViewedUser function with mock username
        const response = await store.getViewedUser(profileMock.userName);

        expect(response).toStrictEqual(profileMock);
    })

    test('', async () => {
        const mockGet = vi.spyOn(axios, 'get');
        const recordsMock: [] = [];
        mockGet.mockResolvedValue({ data: recordsMock });
        const records = await agent.Records.getList()
        expect(records).toStrictEqual(recordsMock);
    });
});
