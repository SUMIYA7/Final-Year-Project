const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rm6urjg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        await client.connect();

        const usersCollection = client.db("baiustDB").collection("users");
        const noticeCollection = client.db("baiustDB").collection("notice");
        const imageCollection = client.db("baiustDB").collection("image");
        const admissionStudentCollection = client.db("baiustDB").collection("admissionStudent");
        const facultyCollection = client.db("baiustDB").collection("faculty");
        const userStudentCollection = client.db("baiustDB").collection("userStudent");
        const transportCardCollection = client.db("baiustDB").collection("transportCard");
        const transportAuthorCollection = client.db("baiustDB").collection("transportAuthor");
        const semRegCollection = client.db("baiustDB").collection("semReg");
        const certificateCollection = client.db("baiustDB").collection("certificate");
        const resultCollection = client.db("baiustDB").collection("result");
        
        //Result---------------------------------------------------------------------
        app.post('/result', async (req, res) => {
            const review = req.body;
            const c = await resultCollection.insertOne(review);
            res.send(c);
        });


        app.get('/result', async (req, res) => {
            const result = await resultCollection.find().toArray();
            res.send(result);
        });

        app.get('/resultSheet', async (req, res) => {
            let query = {};

            if (req.query.studentEmail) {
                query = {
                    studentEmail: req.query.studentEmail
                }
            }
            const cursor = resultCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });

        app.get('/result/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const notice = await resultCollection.findOne(query);

                if (notice) {
                    res.status(200).send(notice);
                } else {
                    res.status(404).send('Notice not found');
                }
            } catch (error) {
                console.error('Error fetching notice:', error);
                res.status(500).send('Internal Server Error: ' + error.message);
            }
        });

        //Certificate---------------------------------------------------------------------
        app.post('/certificate', async (req, res) => {
            const review = req.body;
            const c = await certificateCollection.insertOne(review);
            res.send(c);
        });


        app.get('/certificate', async (req, res) => {
            const result = await certificateCollection.find().toArray();
            res.send(result);
        });

        app.get('/certificate/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const notice = await certificateCollection.findOne(query);

                if (notice) {
                    res.status(200).send(notice);
                } else {
                    res.status(404).send('Notice not found');
                }
            } catch (error) {
                console.error('Error fetching notice:', error);
                res.status(500).send('Internal Server Error: ' + error.message);
            }
        });

        app.get('/certificate/:department/:studentId', async (req, res) => {
            try {
                const department = req.params.department;
                const studentId = req.params.studentId;
                const query = { Department: department, StudentId: studentId };
                const certificate = await certificateCollection.findOne(query);

                if (certificate) {
                    res.status(200).send(certificate);
                } else {
                    res.status(404).send('Certificate not found for the provided Department and Student ID.');
                }
            } catch (error) {
                console.error('Error fetching certificate:', error);
                res.status(500).send('Internal Server Error: ' + error.message);
            }
        });



        //NewTransportAuthor---------------------------------------------------------------------
        app.post('/semReg', async (req, res) => {
            const review = req.body;
            const c = await semRegCollection.insertOne(review);
            res.send(c);
        });

        app.get('/semReg', async (req, res) => {
            const result = await semRegCollection.find().toArray();
            res.send(result);
        });

        app.get('/semReg/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const notice = await semRegCollection.findOne(query);

                if (notice) {
                    res.status(200).send(notice);
                } else {
                    res.status(404).send('Notice not found');
                }
            } catch (error) {
                console.error('Error fetching notice:', error);
                res.status(500).send('Internal Server Error: ' + error.message);
            }
        });


        //NewTransportAuthor---------------------------------------------------------------------
        app.post('/transportAuthor', async (req, res) => {
            const review = req.body;
            const c = await transportAuthorCollection.insertOne(review);
            res.send(c);
        });

    
        app.get('/transportAuthor', async (req, res) => {
            const result = await transportAuthorCollection.find().toArray();
            res.send(result);
        });

        app.get('/transportAuthor/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const notice = await transportAuthorCollection.findOne(query);

                if (notice) {
                    res.status(200).send(notice);
                } else {
                    res.status(404).send('Notice not found');
                }
            } catch (error) {
                console.error('Error fetching notice:', error);
                res.status(500).send('Internal Server Error: ' + error.message);
            }
        });


        //TransportCard---------------------------------------------------------------------
        app.post('/transportCard', async (req, res) => {
            const review = req.body;
            const c = await transportCardCollection.insertOne(review);
            res.send(c);
        });

        app.get('/transportCard', async (req, res) => {
            const result = await transportCardCollection.find().toArray();
            res.send(result);
        });

        app.get('/transportCardId', async (req, res) => {
            let query = {};

            if (req.query.cID) {
                query = {
                    cID: req.query.cID
                }
            }
            const cursor = transportCardCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });

        app.get('/transportCard/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const notice = await transportCardCollection.findOne(query);

                if (notice) {
                    res.status(200).send(notice);
                } else {
                    res.status(404).send('Notice not found');
                }
            } catch (error) {
                console.error('Error fetching notice:', error);
                res.status(500).send('Internal Server Error: ' + error.message);
            }
        });

        


        //Users Student---------------------------------------------------------------------
        app.get('/userStudent', async (req, res) => {
            const result = await userStudentCollection.find().toArray();
            res.send(result);
        });

        app.get('/userStudents', async (req, res) => {
            let query = {};

            if (req.query.Email) {
                query = {
                    Email: req.query.Email
                }
            }
            const cursor = userStudentCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });

        app.get('/userStudent/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const notice = await userStudentCollection.findOne(query);

                if (notice) {
                    res.status(200).send(notice);
                } else {
                    res.status(404).send('Notice not found');
                }
            } catch (error) {
                console.error('Error fetching notice:', error);
                res.status(500).send('Internal Server Error: ' + error.message);
            }
        });

        app.post('/userStudent', async (req, res) => {
            const review = req.body;
            const c = await userStudentCollection.insertOne(review);
            res.send(c);
        });


        //Users---------------------------------------------------------------------
        app.get('/users',  async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        });

        app.get('/user', async (req, res) => {
            let query = {};

            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = usersCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user.email }
            const existingUser = await usersCollection.findOne(query);

            if (existingUser) {
                return res.send({ message: 'user already exists' })
            }

            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        
        // Notice------------------------------------------------------
        app.post('/notice', async (req, res) => {
            const review = req.body;
            const c = await noticeCollection.insertOne(review);
            res.send(c);
        });
        app.get('/notice', async (req, res) => {
            let query = {};
            const cursor = noticeCollection.find(query).sort({ _id: -1 }).limit(0);
            const a = await cursor.toArray();
            res.send(a);
        });

        app.get('/notice/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) }; // Ensure ObjectId is invoked with 'new'
                const notice = await noticeCollection.findOne(query);

                if (notice) {
                    res.status(200).send(notice); // Send the notice if found
                } else {
                    res.status(404).send('Notice not found'); // Send 404 if notice not found
                }
            } catch (error) {
                console.error('Error fetching notice:', error);
                res.status(500).send('Internal Server Error: ' + error.message); // Send detailed error message
            }
        });

        app.delete('/notice/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };

            try {
                const result = await noticeCollection.deleteOne(query);
                if (result.deletedCount === 1) {
                    res.status(200).json({ message: 'Notice deleted successfully' });
                } else {
                    res.status(404).json({ error: 'Notice not found' });
                }
            } catch (error) {
                console.error('Error deleting notice:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        // Image Collection------------------------------------------------------
        app.post('/image', async (req, res) => {
            const review = req.body;
            const c = await imageCollection.insertOne(review);
            res.send(c);
        });
        app.get('/image', async (req, res) => {
            let query = {};
            const cursor = imageCollection.find(query).sort({ _id: -1 }).limit(0);
            const a = await cursor.toArray();
            res.send(a);
        });

        app.delete('/image/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };

            try {
                const result = await imageCollection.deleteOne(query);
                if (result.deletedCount === 1) {
                    res.status(200).json({ message: 'Notice deleted successfully' });
                } else {
                    res.status(404).json({ error: 'Notice not found' });
                }
            } catch (error) {
                console.error('Error deleting notice:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });


        
       // Admission------------------------------------------------------
        app.post('/admission', async (req, res) => {
            const review = req.body;
            const c = await admissionStudentCollection.insertOne(review);
            res.send(c);
        });
        app.get('/admission', async (req, res) => {
            let query = {};
            const cursor = admissionStudentCollection.find(query).sort({ _id: -1 }).limit(0);
            const a = await cursor.toArray();
            res.send(a);
        });

        app.get('/admission/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const notice = await admissionStudentCollection.findOne(query);

                if (notice) {
                    res.status(200).send(notice); 
                } else {
                    res.status(404).send('Notice not found'); 
                }
            } catch (error) {
                console.error('Error fetching notice:', error);
                res.status(500).send('Internal Server Error: ' + error.message); 
            }
        });


        // Faculty------------------------------------------------------
        app.post('/faculty', async (req, res) => {
            const review = req.body;
            const c = await facultyCollection.insertOne(review);
            res.send(c);
        });
        app.get('/faculty', async (req, res) => {
            let query = {};
            const cursor = facultyCollection.find(query).sort({ _id: -1 }).limit(0);
            const a = await cursor.toArray();
            res.send(a);
        });
        app.delete('/faculty/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };

            try {
                const result = await facultyCollection.deleteOne(query);
                if (result.deletedCount === 1) {
                    res.status(200).json({ message: 'Deleted successfully' });
                } else {
                    res.status(404).json({ error: ' not found' });
                }
            } catch (error) {
                console.error('Error deleting:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });


    


    }
    finally {

    }
}
run().catch(console.log);







app.get('/', (req, res) => {
    res.send('BAIUST server is running')
})
app.listen(port, () => {
    console.log(`'BAIUST server is running on port, ${port}`)
})



