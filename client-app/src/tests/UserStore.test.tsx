import { describe, test, expect, vi, beforeEach } from 'vitest'
import agent from '@/app/api/serviceAgent';
import axios from 'axios'

import { User } from '@/app/models/user';
import UserStore from '@/app/stores/userStore';


describe('User domain store - logic functions', () => {

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
        Return logged in status when logged in 
    */
    test('get isLoggedIn returns true if user is signed in.', async () => {
        const store = new UserStore;

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

        //Set the user and get the login status
        store.user = userMock;
        const response = store.isLoggedIn;

        // User login status should be true.
        expect(response).toStrictEqual(true);
    })

    /*  
        Return logged in status when logged in 
    */
    test('get isLoggedIn returns false if user is not signed in.', async () => {
        const store = new UserStore;

        //Call the function to evaluate login status (no set user)
        const response = store.isLoggedIn;

        // User login status should be false.
        expect(response).toStrictEqual(false);
    })

    test('', async () => {
        const mockGet = vi.spyOn(axios, 'get');
        const recordsMock: [] = [];
        mockGet.mockResolvedValue({ data: recordsMock });
        const records = await agent.Records.getList()
        expect(records).toStrictEqual(recordsMock);
    });
});