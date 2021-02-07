const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const bcrypt = require('bcrypt');
const saltRounds = 10;

export default class {

    static setupDbForDev() {
        try {
            //  This sets up a DB in memory to be used by creating tables, inserting values, etc.
            db.serialize(function () {
                // Create Users table:
                const createUsersTable =
                    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, profile_pic TEXT )`;
                db.run(createUsersTable);
                //  Insert seed data for Users table. 
                let password = '123'
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    if (err) {
                        throw new Error(err);
                    } else {
                        const insertUsers =
                            `INSERT INTO users (id, username, password, profile_pic) VALUES
                    (1, 'banjo', '${hash}', 'https://random.dog/c61a3df2-abe3-4b0a-84ee-d036f8696814.jpg'),
                    (2, 'kahlo', '${hash}', 'https://random.dog/6edac66e-c0de-4e69-a9d6-b2e6f6f9001b.jpg'),
                    (3, 'sparky', '${hash}', 'https://random.dog/a7c60c7b-4ace-47f7-8743-272707e97784.jpg'),
                    (4, 'spot', '${hash}', 'https://random.dog/e2032897-2617-4963-be00-947e5b9afda6.jpg'),
                    (5, 'biff', '${hash}', 'https://random.dog/866c8bed-e040-4e05-9009-9d525e03c9f6.jpg'),
                    (6, 'puddles', '${hash}', 'https://random.dog/9101ee3d-4686-4a53-8499-36459e5f25af.jpg')
                    `
                        db.run(insertUsers);
                    }
                });
                ////////////////

                // Create Posts Table
                const createPostsTable = "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, user_id INTEGER)";
                db.run(createPostsTable);

                const insertPosts = `INSERT INTO posts (id, content, user_id) 
                VALUES 
                (1, 'Looks like a great day to chase birds and shadows', 1), 
                (2, 'I found a great ball to play with today!', 2), 
                (3, 'Hey guys, I am Sparky and I am new here. What can I pee on?', 3), 
                (4, 'Man I love a good shoe to chew on.', 4),             
                (5, 'Been a good boy but owner did not give me a biscuit so gonna probably poop on the stoop', 5), 
                (6, 'Anyone wanna hit the park today?', 6)
                `
                db.run(insertPosts);

                ////////////////

                // Create Comments Table
                const createCommentsTable = "CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, comment TEXT, user_id INTEGER, post_id INTEGET)";
                db.run(createCommentsTable);

                const insertComments = `INSERT INTO comments (id, comment, user_id, post_id) 
                VALUES
                (1, 'You said it brother! Super fun day for that!', 2, 1),
                (2, 'Welcome to Barker, dude. It is a great app', 1, 3),
                (3, 'Welcome to the hood. Cant wait to sniff some butt', 6, 3),
                (4, 'Hey man stop sign at 9th and 3rd is my spot to pee on. just a fi', 5, 3),
                (5, 'That sucks dude. Hooman got milkbone or what?', 2, 5),
                (6, 'I would be down but I am aggressive to puppies so prob not.', 2, 6),
                (7, 'I will be there at 4pm lets sniff buts and chase that orange ball again bro', 5, 6),
                (8, 'I wanna go 2 duh park a eat frizB', 3, 6)
                `
                db.run(insertComments);

                ////////////////



                // Create Followers Table
                const createFollowersTable = "CREATE TABLE IF NOT EXISTS followers (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER,  follower_id INTEGER)";
                db.run(createFollowersTable);

                const insertFollowers = `INSERT INTO followers (user_id, follower_id) 
                VALUES
                (1, 2),
                (1, 4),
                (1, 5),
                (1, 6),
                (2, 1),
                (2, 4),
                (2, 5),
                (3, 6),
                (3, 2),
                (3, 4),
                (4, 5),
                (4, 6),
                (4, 1),
                (5, 1),
                (5, 3),
                (5, 2)
                `
                db.run(insertFollowers);

                ////////////////


            });
        } catch (ex) {
            throw new Error(ex);
        }
    }

    static all(stmt, params) {
        return new Promise((res, rej) => {
            db.all(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }
    static get(stmt, params) {
        return new Promise((res, rej) => {
            db.get(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }

    static run(stmt, params) {
        return new Promise((res, rej) => {
            db.run(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }


}
