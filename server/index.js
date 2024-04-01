
const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const path = require('path');
const axios = require('axios')
const http = require('http');
const FormData = require('form-data');
const fs = require('fs');

//const varifyUser = require('./middlewere/verifyuser')

const app = express();
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}))
app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/fyp');

const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(loginRoutes);
app.use(registerRoutes);
app.use(userRoutes);
app.use(adminRoutes);
//app.get('/videos', express.static(path.join(__dirname, 'uploads')));

const videosDirectory = path.join(__dirname, "uploads");

// Endpoint to list all available videos
app.get("/videos", (req, res) => {
  fs.readdir(videosDirectory, (err, files) => {
    if (err) {
      console.error("Error reading videos directory:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Filter out non-video files (e.g., directories)
    const videoFiles = files.filter(file => {
      return file.endsWith(".avi"); // Adjust file extension as needed
    });

    res.json({ videos: videoFiles });
  });
});

app.get("/videos/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(videosDirectory, filename);

  fs.stat(filePath, (err, stat) => {
    if (err) {
      console.error("Error getting file stats:", err);
      return res.status(404).json({ error: "Video not found" });
    }

    // Set appropriate headers for video streaming
    res.writeHead(200, {
      "Content-Type": "video/mp4",
      "Content-Length": stat.size
    });

    // Create a readable stream from the video file and pipe it to the response
    const videoStream = fs.createReadStream(filePath);
    videoStream.pipe(res);
  });
});



const varifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if(!token) {
      return res.json("Token is missing")
  } else {
      jwt.verify(token, "jwt-secret-key", (err, decoded) => {
          if(err) {
              return res.json("Error with token")
          } else {
              if(decoded.role === "admin") {
                  next();
              } else {
                  return res.json("not admin")
              }
          }
      })
  }
}

const verifyUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.json("Token is missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("Error with token");
      } else {
        req.user = decoded; // Attach user information to the request object
        next();
      }
    });
  }
};


const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const userId = req.user.email;
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, userId + '-' + Date.now() + '-' +file.originalname); // Customize filename with user ID
  }
  })

const upload = multer({ storage: storage })

app.post('/upload', verifyUser, upload.array('videos', 2), async function (req, res) {
  try {
      const formData = new FormData();

      // Append each video file to formData with the key "videos"
      req.files.forEach(file => {
          formData.append('files', fs.createReadStream(file.path), { filename: file.originalname });
      });

      // Set headers for authorization and content type
      formData.append('Authorization', req.headers.authorization);

      // Prepare request options
      const options = {
          hostname: 'localhost',
          port: 8000,
          path: '/upload/',
          method: 'POST',
          headers: {
              ...formData.getHeaders()
          }
      };

      // Send request to the local server to handle uploaded videos
      const request = http.request(options, (response) => {
          let data = '';
          response.on('data', (chunk) => {
              data += chunk;
          });
          response.on('end', () => {
              console.log('Response from local server:', data);
              res.json({ status: 'Success', message: data });
          });
      });

      // Pipe form data to request
      formData.pipe(request);

      // Handle errors
      request.on('error', (error) => {
          console.error('Error sending files to local server:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      });

  } catch (error) {
      // Log error
      console.error('Error sending files to local server:', error);
      // Respond to the client with an error message
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/Recorded', verifyUser, upload.array('videos', 2), async function (req, res) {
  try {
      const formData = new FormData();

      // Append each video file to formData with the key "videos"
      req.files.forEach(file => {
          formData.append('files', fs.createReadStream(file.path), { filename: file.originalname });
      });

      // Set headers for authorization and content type
      formData.append('Authorization', req.headers.authorization);

      // Prepare request options
      const options = {
          hostname: 'localhost',
          port: 8000,
          path: '/upload/',
          method: 'POST',
          headers: {
              ...formData.getHeaders()
          }
      };

      // Send request to the local server to handle uploaded videos
      const request = http.request(options, (response) => {
          let data = '';
          response.on('data', (chunk) => {
              data += chunk;
          });
          response.on('end', () => {
              console.log('Response from local server:', data);
              res.json({ status: 'Success', message: data });
          });
      });

      // Pipe form data to request
      formData.pipe(request);

      // Handle errors
      request.on('error', (error) => {
          console.error('Error sending files to local server:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      });

  } catch (error) {
      // Log error
      console.error('Error sending files to local server:', error);
      // Respond to the client with an error message
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(3001, () => {
  console.log('Server is running');
});
