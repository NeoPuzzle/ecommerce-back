import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository {
    private users = [
        {
            id: 1,
            email: "user1@example.com",
            name: "John Doe",
            password: "password1",
            address: "123 Main Street",
            phone: "123-456-7890",
            country: "USA",
            city: "New York"
        },
        {
            id: 2,
            email: "user2@example.com",
            name: "Jane Smith",
            password: "password2",
            address: "456 Elm Street",
            phone: "987-654-3210",
            country: "USA",
            city: "Los Angeles"
        },
        {
            id: 3,
            email: "user3@example.com",
            name: "Alice Johnson",
            password: "password3",
            address: "789 Oak Street",
            phone: "555-123-4567",
            country: "USA",
            city: "Chicago"
        },
        {
            id: 4,
            email: "user4@example.com",
            name: "Bob Brown",
            password: "password4",
            address: "321 Pine Street",
            phone: "222-333-4444",
            country: "USA",
            city: "Houston"
        },
        {
            id: 5,
            email: "user5@example.com",
            name: "Emily Davis",
            password: "password5",
            address: "654 Maple Street",
            phone: "777-888-9999",
            country: "USA",
            city: "San Francisco"
        },
        {
            id: 6,
            email: "user6@example.com",
            name: "Michael Wilson",
            password: "password6",
            address: "987 Cedar Street",
            phone: "444-555-6666",
            country: "USA",
            city: "Seattle"
        }
    ];
    

    async getUsers() {
        return await this.users;
    }
}