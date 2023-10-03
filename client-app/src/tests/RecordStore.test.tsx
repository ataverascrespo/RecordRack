import { describe, test, expect, vi, beforeEach } from 'vitest'
import agent from '@/app/api/serviceAgent';
import axios from 'axios'

import RecordStore from '@/app/stores/recordStore';
import { SavedRecord } from '@/app/models/record';


describe('Record service agent API calls', () => {


    //Reset the tests each time to evade false positives
    beforeEach(() => {
        //Spy on axios requests to intercept with a mock
        const mockGet = vi.spyOn(axios, 'get');
        const mockPost = vi.spyOn(axios, 'post');

        mockGet.mockReset()
        mockPost.mockReset()
    });

    test('Empty GET is empty', async () => {
        const mockGet = vi.spyOn(axios, 'get');
        const recordsMock: SavedRecord[] = [];
        mockGet.mockResolvedValue({ data: recordsMock });
        const records = await agent.Records.getList()
        expect(records).toStrictEqual(recordsMock);
    });

    /*  
        Test 1 - load an array of non-empty records for current user
    */
    test('loadRecords() loads a non-empty array of records', async () => {
        const store = new RecordStore;


        //Spy on axios requests to intercept with a mock
        const mockGet = vi.spyOn(axios, 'get');

        const recordsMock: SavedRecord[] = [
            {
                "id": "1",
                "albumName": "Sample Album 1",
                "artistName": "Sample Artist 1",
                "releaseDate": "2022-01-15",
                "albumType": "Studio",
                "albumDescription": "This is a sample album description 1.",
                "dateAdded": "2023-09-20",
                "photoURL": "https://example.com/album1.jpg",
                "spotifyID": "album1_spotify_id",
                "isPrivate": false,
                "user": {
                    "id": 123,
                    "email": "user@example.com",
                    "userName": "sample_user",
                    "token": "your_auth_token_here",
                    "imageURL": "https://example.com/user_profile.jpg",
                    "imageID": "123456",
                    "following": false,
                    "followersCount": 0,
                    "followingCount": 0
                },
                "likes": []
            },
            {
                "id": "2",
                "albumName": "Sample Album 2",
                "artistName": "Sample Artist 2",
                "releaseDate": "2022-03-20",
                "albumType": "Live",
                "albumDescription": "This is a sample album description 2.",
                "dateAdded": "2023-09-21",
                "photoURL": "https://example.com/album2.jpg",
                "spotifyID": "album2_spotify_id",
                "isPrivate": true,
                "user": {
                    "id": 123,
                    "email": "user@example.com",
                    "userName": "sample_user",
                    "token": "your_auth_token_here",
                    "imageURL": "https://example.com/user_profile.jpg",
                    "imageID": "123456",
                    "following": false,
                    "followersCount": 0,
                    "followingCount": 0
                },
                "likes": []
            }
        ];

        //Return a promise with mock data
        mockGet.mockResolvedValue({ data: recordsMock });

        //Call record store's load record function
        const response = await store.loadRecords();

        expect(response).toStrictEqual(recordsMock);
    })


    /*  
        Test 2 - load an empty array of records for current user
    */
    test('loadRecords() loads an empty array of records', async () => {
        const store = new RecordStore;

        //Spy on axios requests to intercept with a mock
        const mockGet = vi.spyOn(axios, 'get');

        //Create an empty array
        const recordsMock: SavedRecord[] = [];

        //Return a promise with mock data
        mockGet.mockResolvedValue({ data: recordsMock });

        const response = await store.loadRecords();
        expect(response).toStrictEqual(recordsMock);
    })

    /*  
        Test 3 - load an non-empty array of records for a given user
    */
    test('loadRecordsForUser() loads an array of records', async () => {
        const store = new RecordStore;

        //Spy on axios requests to intercept with a mock
        const mockGet = vi.spyOn(axios, 'get');

        const recordsMock: SavedRecord[] = [
            {
                "id": "1",
                "albumName": "Sample Album 1",
                "artistName": "Sample Artist 1",
                "releaseDate": "2022-01-15",
                "albumType": "Studio",
                "albumDescription": "This is a sample album description 1.",
                "dateAdded": "2023-09-20",
                "photoURL": "https://example.com/album1.jpg",
                "spotifyID": "album1_spotify_id",
                "isPrivate": false,
                "user": {
                    "id": 123,
                    "email": "user@example.com",
                    "userName": "sample_user",
                    "token": "your_auth_token_here",
                    "imageURL": "https://example.com/user_profile.jpg",
                    "imageID": "123456",
                    "following": false,
                    "followersCount": 0,
                    "followingCount": 0
                },
                "likes": []
            },
            {
                "id": "2",
                "albumName": "Sample Album 2",
                "artistName": "Sample Artist 2",
                "releaseDate": "2022-03-20",
                "albumType": "Live",
                "albumDescription": "This is a sample album description 2.",
                "dateAdded": "2023-09-21",
                "photoURL": "https://example.com/album2.jpg",
                "spotifyID": "album2_spotify_id",
                "isPrivate": true,
                "user": {
                    "id": 123,
                    "email": "user@example.com",
                    "userName": "sample_user",
                    "token": "your_auth_token_here",
                    "imageURL": "https://example.com/user_profile.jpg",
                    "imageID": "123456",
                    "following": false,
                    "followersCount": 0,
                    "followingCount": 0
                },
                "likes": []
            }
        ];

        //Return a promise with mock data
        mockGet.mockResolvedValue({ data: recordsMock });

        const userID = 123;

        //Call record store's load record function
        const response = await store.loadRecordsForUser(userID);

        expect(response).toStrictEqual(recordsMock);
    })

    /*  
        Test 4 - load an empty array of records for a given user
    */
    test('loadRecordsForUser() loads an empty array of records', async () => {
        const store = new RecordStore;

        //Spy on axios requests to intercept with a mock
        const mockGet = vi.spyOn(axios, 'get');

        const recordsMock: SavedRecord[] = [];

        //Return a promise with mock data
        mockGet.mockResolvedValue({ data: recordsMock });

        const userID = 123;

        //Call record store's load record function
        const response = await store.loadRecordsForUser(userID);

        expect(response).toStrictEqual(recordsMock);
    })

    /*  
        Test 5 - sorting records by type
    */
    test('sortRecordsType() will save chosen sorted type', async () => {
        const store = new RecordStore;
        const sortType = "album";

        //Call record store function
        store.sortRecordsType(sortType);

        expect(sortType).toStrictEqual(store.savedRecordsSortType);
    })

    /*  
       Test 6 - sorting records by ascending order (newest first)
    */
    test('sortRecordsOrder() will sort a list of records in ascending order and save the specified sort type', async () => {
        const store = new RecordStore;

        const recordsMock: SavedRecord[] = [
            {
                "id": "1",
                "albumName": "Sample Album 1",
                "artistName": "Sample Artist 1",
                "releaseDate": "2022-01-15",
                "albumType": "Studio",
                "albumDescription": "This is a sample album description 1.",
                //Set the date added to 2022
                "dateAdded": "2022-10-03T14:18:24.382Z",
                "photoURL": "https://example.com/album1.jpg",
                "spotifyID": "album1_spotify_id",
                "isPrivate": false,
                "user": {
                    "id": 123,
                    "email": "user@example.com",
                    "userName": "sample_user",
                    "token": "your_auth_token_here",
                    "imageURL": "https://example.com/user_profile.jpg",
                    "imageID": "123456",
                    "following": false,
                    "followersCount": 0,
                    "followingCount": 0
                },
                "likes": []
            },
            {
                "id": "2",
                "albumName": "Sample Album 2",
                "artistName": "Sample Artist 2",
                "releaseDate": "2022-03-20",
                "albumType": "Live",
                "albumDescription": "This is a sample album description 2.",
                //Set the date added to 2023
                "dateAdded": "2023-10-03T14:18:24.382Z",
                "photoURL": "https://example.com/album2.jpg",
                "spotifyID": "album2_spotify_id",
                "isPrivate": true,
                "user": {
                    "id": 123,
                    "email": "user@example.com",
                    "userName": "sample_user",
                    "token": "your_auth_token_here",
                    "imageURL": "https://example.com/user_profile.jpg",
                    "imageID": "123456",
                    "following": false,
                    "followersCount": 0,
                    "followingCount": 0
                },
                "likes": []
            }
        ];

        //Sort by ascending - newest first
        const sortOrder = "asc";
        //Manually set the saved records in the store to the created mock records
        store.savedRecords = recordsMock;

        //Call record store function
        const response = store.sortRecordsOrder(sortOrder);

        expect(sortOrder).toStrictEqual(store.savedRecordsSortOrder);
        expect(response).toStrictEqual(recordsMock);
    })

    /*  
       Test 7 - sorting records by descending order (oldest first)
    */
    test('sortRecordsOrder() will sort a list of records in descending order and save the specified sort type', async () => {
        const store = new RecordStore;

        const recordsMock: SavedRecord[] = [
            {
                "id": "1",
                "albumName": "Sample Album 1",
                "artistName": "Sample Artist 1",
                "releaseDate": "2022-01-15",
                "albumType": "Studio",
                "albumDescription": "This is a sample album description 1.",
                //Set the date added to 2023
                "dateAdded": "2023-10-03T14:18:24.382Z",
                "photoURL": "https://example.com/album1.jpg",
                "spotifyID": "album1_spotify_id",
                "isPrivate": false,
                "user": {
                    "id": 123,
                    "email": "user@example.com",
                    "userName": "sample_user",
                    "token": "your_auth_token_here",
                    "imageURL": "https://example.com/user_profile.jpg",
                    "imageID": "123456",
                    "following": false,
                    "followersCount": 0,
                    "followingCount": 0
                },
                "likes": []
            },
            {
                "id": "2",
                "albumName": "Sample Album 2",
                "artistName": "Sample Artist 2",
                "releaseDate": "2022-03-20",
                "albumType": "Live",
                "albumDescription": "This is a sample album description 2.",
                //Set the date added to 2022
                "dateAdded": "2022-10-03T14:18:24.382Z",
                "photoURL": "https://example.com/album2.jpg",
                "spotifyID": "album2_spotify_id",
                "isPrivate": true,
                "user": {
                    "id": 123,
                    "email": "user@example.com",
                    "userName": "sample_user",
                    "token": "your_auth_token_here",
                    "imageURL": "https://example.com/user_profile.jpg",
                    "imageID": "123456",
                    "following": false,
                    "followersCount": 0,
                    "followingCount": 0
                },
                "likes": []
            }
        ];

        //Sort by descending - oldest first
        const sortOrder = "desc";
        //Manually set the saved records in the store to the created mock records
        store.savedRecords = recordsMock;

        //Call record store function
        const response = store.sortRecordsOrder(sortOrder);

        expect(sortOrder).toStrictEqual(store.savedRecordsSortOrder);
        expect(response).toStrictEqual(recordsMock);
    })

    /*  
        Test 8 - searching records
    */
    test('setRecordsSearchQuery() will save search query', async () => {
        const store = new RecordStore;
        const searchQuery = "Generic Album";

        //Call record store function
        store.setRecordsSearchQuery(searchQuery);

        expect(searchQuery).toStrictEqual(store.savedRecordsSearchQuery);
    })

    /*  
        Test 9 - load a record
    */
    test('recordStore.loadRecord() loads a given record', async () => {
        const store = new RecordStore;

        //Spy on axios requests to intercept with a mock
        const mockGet = vi.spyOn(axios, 'get');

        const recordsMock: SavedRecord[] = [];

        //Return a promise with mock data
        mockGet.mockResolvedValue({ data: recordsMock });
        const userID = 123;

        //Call record store's load record function
        const response = await store.loadRecordsForUser(userID);

        expect(response).toStrictEqual(recordsMock);
    })
});
