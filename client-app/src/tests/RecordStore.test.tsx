import { describe, test, expect, vi, beforeEach } from 'vitest'
import agent from '@/app/api/serviceAgent';
import axios from 'axios'

import RecordStore from '@/app/stores/recordStore';
import { AddRecord, SavedRecord, UpdateRecord } from '@/app/models/record';
import { User } from '@/app/models/user';
import { ProfileUser } from '@/app/models/profile';


describe('Record domain store - logic functions', () => {


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
        Load an empty array of records for current user
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
        Load an non-empty array of records for a given user
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
        Load an empty array of records for a given user
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
       Sorting records by ascending order (newest first)
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
       Sorting records by descending order (oldest first)
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
        searching records
    */
    test('setRecordsSearchQuery() will save search query', async () => {
        const store = new RecordStore;
        const searchQuery = "Generic Album";

        //Call record store function
        store.setRecordsSearchQuery(searchQuery);

        expect(searchQuery).toStrictEqual(store.savedRecordsSearchQuery);
    })

    /*  
         load a record
    */
    test('loadRecord() loads a given record', async () => {
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
        unselecting a record
    */
    test('unselectRecord() unselects a selected record', async () => {
        const store = new RecordStore;

        // Define mock record
        const recordMock: SavedRecord = {
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
        };

        // Set the selected record, then call record store's unselect record function.
        store.selectedRecord = recordMock;
        await store.unselectRecord();

        // Selected Record should be undefined.
        expect(undefined).toStrictEqual(store.selectedRecord);
    })

    /*
         Adding a unique record
    */
    test('addRecord() successfully adds a unique record', async () => {
        const store = new RecordStore;

        //Spy on axios requests to intercept with a mock
        const mockPost = vi.spyOn(axios, 'post');

        // Define mock record
        const recordToAdd: AddRecord = {
            "albumName": "Sample Album 1",
            "artistName": "Sample Artist 1",
            "releaseDate": "2022-01-15",
            "albumType": "Studio",
            "albumDescription": "This is a sample album description 1.",
            "dateAdded": "2023-09-20",
            "photoURL": "https://example.com/album1.jpg",
            "spotifyID": "album1_spotify_id",
            "isPrivate": false,
        };

        // Define mock response
        const expectedResponse = {
            "data": null,
            "success": true,
            "returnMessage": "Message"
        };

        //Return a promise with mock data and call the store function
        mockPost.mockResolvedValue({ data: expectedResponse });
        const response = await store.addRecord(recordToAdd);

        // Expect that the POST response success field is set to true.
        // The API returns success as true when the record was successfully added.
        expect(response.success).toStrictEqual(expectedResponse.success);
    })

    /*
         Adding a non-unique record
    */
    test('addRecord() fails to add a non-unique record', async () => {
        const store = new RecordStore;

        //Spy on axios requests to intercept with a mock
        const mockPost = vi.spyOn(axios, 'post');

        // Define mock record and add it
        const recordToAdd: AddRecord = {
            "albumName": "Sample Album 1",
            "artistName": "Sample Artist 1",
            "releaseDate": "2022-01-15",
            "albumType": "Studio",
            "albumDescription": "This is a sample album description 1.",
            "dateAdded": "2023-09-20",
            "photoURL": "https://example.com/album1.jpg",
            "spotifyID": "album1_spotify_id",
            "isPrivate": false,
        };
        await store.addRecord(recordToAdd);

        // Define mock record that is an exact duplicate
        const recordToFail: AddRecord = {
            "albumName": "Sample Album 1",
            "artistName": "Sample Artist 1",
            "releaseDate": "2022-01-15",
            "albumType": "Studio",
            "albumDescription": "This is a sample album description 1.",
            "dateAdded": "2023-09-20",
            "photoURL": "https://example.com/album1.jpg",
            "spotifyID": "album1_spotify_id",
            "isPrivate": false,
        };

        // Define mock response
        const expectedResponse = {
            "data": null,
            "success": false,
            "returnMessage": "Message"
        };

        //Return a promise with mock data and call the store function
        mockPost.mockResolvedValue({ data: expectedResponse });
        const response = await store.addRecord(recordToFail);

        // Expect that the POST response success field is set to false.
        // The API returns success as true when the record was failed to be added.
        expect(response.success).toStrictEqual(expectedResponse.success);
    })

    /*
         Updating an existing record
    */
    test('updateRecord() successfully updates an existing record', async () => {
        const store = new RecordStore;

        //Spy on axios requests to intercept with a mock
        const mockPut = vi.spyOn(axios, 'put');

        // Define mock record and add it for setup
        const recordToAdd: AddRecord = {
            "albumName": "Sample Album 1",
            "artistName": "Sample Artist 1",
            "releaseDate": "2022-01-15",
            "albumType": "Studio",
            "albumDescription": "This is a sample album description 1.",
            "dateAdded": "2023-09-20",
            "photoURL": "https://example.com/album1.jpg",
            "spotifyID": "album1_spotify_id",
            "isPrivate": false,
        };
        await store.addRecord(recordToAdd);

        // Define mock record to update, with ID of 1 to match the added record.
        const recordToUpdate: UpdateRecord = {
            "id": "1",
            "albumDescription": "This is updated.",
            "isPrivate": false,
        };

        // Define mock response
        const expectedResponse = {
            "data": null,
            "success": true,
            "returnMessage": "Message"
        };

        //Return a promise with mock data and call the store function
        mockPut.mockResolvedValue({ data: expectedResponse });
        const response = await store.updateRecord(recordToUpdate)

        // Expect that the PUT response success field is set to true.
        // The API returns success as true when the record was successfully updated.
        expect(response.success).toStrictEqual(expectedResponse.success);
    })

    /*
         Deleting an existing record
    */
    test('deleteRecord() successfully deletes an existing record', async () => {
        const store = new RecordStore;

        //Spy on axios requests to intercept with a mock
        const mockGet = vi.spyOn(axios, 'get');

        // Mock the records that are returned from loadRecords()
        // We need to have a record to delete
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
            }
        ];

        //Return a promise with mock data and fetch the records.
        mockGet.mockResolvedValue({ data: recordsMock });
        await store.loadRecords();

        // Define ID of record that will be deleted and call delete function
        const deleteID = "1";
        await store.deleteRecord(deleteID)

        // Mock the returned records array expected after deletion
        const deletedMock: SavedRecord[] = [];
        //Return a promise with mock data and fetch the new list of records.
        mockGet.mockResolvedValue({ data: deletedMock });
        const response = await store.loadRecords();

        // Expect that the second record fetch returns an empty array, as designed by our delete Mock.
        // When we delete the record successfully, the retrieved array should be missing that record.
        expect(response).toStrictEqual(deletedMock);
    })

    /*
        Liking an un-liked record
    */
    test('likeRecord() successfully likes an un-liked record.', async () => {
        const store = new RecordStore;

        //Spy on axios requests to intercept with a mock
        const mockPost = vi.spyOn(axios, 'post');

        // Mock the record that will become the selected record
        const recordMock: SavedRecord =
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
        }
        store.selectedRecord = recordMock;

        // Mock a fake user who will like the record.
        const userMock: User = {
            id: 1,
            email: 'test@email.com',
            userName: 'test',
            token: '',
            imageURL: '',
            imageID: '',
            following: false,
            followersCount: 0,
            followingCount: 0
        }

        // Define mock response
        const expectedResponse = {
            "data": null,
            "success": true,
            "returnMessage": "Message"
        };

        //Return a promise with mock data and like the record with passed user
        mockPost.mockResolvedValue({ data: expectedResponse });
        const response = await store.likeRecord(userMock);

        // Expect that the second record fetch returns an empty array, as designed by our delete Mock.
        // When we delete the record successfully, the retrieved array should be missing that record.
        expect(response.success).toStrictEqual(expectedResponse.success);
    })

    /*
        Unliking a liked record
    */
    test('likeRecord() successfully un-likes a liked record.', async () => {
        const store = new RecordStore;

        //Spy on axios requests to intercept with a mock
        const mockPost = vi.spyOn(axios, 'post');

        // Mock the record that will become the selected record
        const recordMock: SavedRecord =
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
            "likes": [
                {
                    id: 1,
                    userName: 'test',
                    imageURL: '',
                    imageID: '',
                    following: false,
                    followersCount: 0,
                    followingCount: 0
                }
            ]
        }
        store.selectedRecord = recordMock;

        // Mock the fake user who has already liked the mocked record.
        const userMock: User = {
            id: 1,
            email: 'test@email.com',
            userName: 'test',
            token: '',
            imageURL: '',
            imageID: '',
            following: false,
            followersCount: 0,
            followingCount: 0
        }

        // Define mock response
        const expectedResponse = {
            "data": null,
            "success": true,
            "returnMessage": "Message"
        };

        //Return a promise with mock data and like the record with passed user
        mockPost.mockResolvedValue({ data: expectedResponse });
        const response = await store.likeRecord(userMock);

        // Expect that the second record fetch returns an empty array, as designed by our delete Mock.
        // When we delete the record successfully, the retrieved array should be missing that record.
        expect(response.success).toStrictEqual(expectedResponse.success);
    })

    /*
        Getting a record's list of likes
    */
    test('getRecordLikes() successfully returns the list of users who have liked the record.', async () => {
        const store = new RecordStore;

        //Spy on axios requests to intercept with a mock
        const mockGet = vi.spyOn(axios, 'get');
        const mockPost = vi.spyOn(axios, 'post');

        // First, we need to setup the test by adding the like to the record.
        // Mock the record that will become the selected record.
        const recordMock: SavedRecord =
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
        }
        store.selectedRecord = recordMock;
        // Mock a fake user who will like the record.
        const userMock: User = {
            id: 1,
            email: 'test@email.com',
            userName: 'test',
            token: '',
            imageURL: '',
            imageID: '',
            following: false,
            followersCount: 0,
            followingCount: 0
        }
        // Define mock response
        const expectedResponse = {
            "data": null,
            "success": true,
            "returnMessage": "Message"
        };
        //Return a promise with mock data and like the record with passed user
        mockPost.mockResolvedValue({ data: expectedResponse });
        await store.likeRecord(userMock);


        // Now, we get to fetch the likes.
        // Mock the profile user who will be returned
        const likedMock: ProfileUser[] = [
            {
                id: 1,
                userName: 'test',
                imageURL: '',
                imageID: '',
                following: false,
                followersCount: 0,
                followingCount: 0
            }
        ];

        //Return a promise with mock data. Call the function to get record likes, pass our mocked record ID of 1
        mockGet.mockResolvedValue({ data: likedMock });
        const response = await store.getRecordLikes("1");

        // Expect that the second record fetch returns an empty array, as designed by our delete Mock.
        // When we delete the record successfully, the retrieved array should be missing that record.
        expect(response).toStrictEqual(likedMock);
    })

    test('', async () => {
        const mockGet = vi.spyOn(axios, 'get');
        const recordsMock: [] = [];
        mockGet.mockResolvedValue({ data: recordsMock });
        const records = await agent.Records.getList()
        expect(records).toStrictEqual(recordsMock);
    });
});
