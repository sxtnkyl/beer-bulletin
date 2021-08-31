# Beer Bulletin  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
  Your one stop shop to trade local beers to get the brews you love. Looking to sell your new micro-brew? Post a listing! Looking for that rare beer that's missing in your collection, someone might just have what you're after! Join Beer Bulletin and get started today. 


## Getting Started

 ## Installation 
  In the directory and CLI of your choice run
  ```
  git clone git@github.com:sxtnkyl/beer-bulletin.git
  ```

  Then navigate to .envExample in the BeerBulletin database and fill out each line accordingly
  beer_bulletin being the name of the database. 
  You will need to create a Cloudinary and Ably account and supply those API keys yourself.
  Ignore the S3 keys.

  Chats are Stored via MongoDB so if you wish to have that functionality you will need to supply a key as well as a hosted atlas.
  
# Recommended Fields
```
DB_USER='root'
DB_PASS=YOURPASSWORDFORSQL
DB_PORT=3306
DB_NAME=beer_bulletin
JWT_KEY=""
DB_HOST=localhost
```

Then, to seed the DB, create a DB in your SQL manager of choice with the same name that you placed above in DB_Name,
run the command
```
DROP DATABASE IF EXISTS beer_bulletin
CREATE DATABASE beer_bulletin;
```
Make sure this name matches DB_name in env.

  Then navigate to your root directory and run 
  ```
  npm i
  npm run dev
  ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


  If all your keys in your .env are correct you should be able to enter
  ```
  localhost:3000
  ```
  and you will be able to run the software locally. You can specify other ports as well all of those are determined in Connection.js

  --------
  ## Contact Us

[Kyle Sexton](https://github.com/sxtnkyl)

[Bob Perez](https://github.com/perez-rob)

[Austin Huffman](https://github.com/Ahuffma2)



  

