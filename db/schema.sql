DROP DATABASE IF EXISTS beer_bulletin;

CREATE DATAB
 DROP TABLE IF EXISTS `offer`;
 DROP TABLE IF EXISTS `trade`;
 DROP TABLE IF EXISTS `user`;
 DROP TABLE IF EXISTS `user`;
 CREATE TABLE IF NOT EXISTS `user` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(255) NOT NULL UNIQUE, `email` VARCHAR(255) NOT NULL UNIQUE, `password` VARCHAR(255) NOT NULL, `first_name` VARCHAR(255), `last_name` VARCHAR(255), `pref_dark` TINYINT(1) DEFAULT false, `profile_pic` TEXT, PRIMARY KEY (`id`)) ENGINE=InnoDB;
 SHOW INDEX FROM `user`
 DROP TABLE IF EXISTS `trade`;
 CREATE TABLE IF NOT EXISTS `trade` (`id` INTEGER NOT NULL auto_increment , `user_id` INTEGER NOT NULL, `title` VARCHAR(255) NOT NULL, `content` TEXT NOT NULL, `seeking` TINYINT(1) NOT NULL, `picture` TEXT, `open` TINYINT(1) DEFAULT true, PRIMARY KEY (`id`), FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
 SHOW INDEX FROM `trade`
 DROP TABLE IF EXISTS `offer`;
 CREATE TABLE IF NOT EXISTS `offer` (`id` INTEGER NOT NULL auto_increment , `host_id` INTEGER NOT NULL, `participant_id` INTEGER NOT NULL, `trade_id` INTEGER NOT NULL, `resolved` TINYINT(1) DEFAULT false, `endpoint` VARCHAR(255), `offer_money` INTEGER DEFAULT 0, `offer_beer` VARCHAR(255) DEFAULT '', `offer_other` VARCHAR(255) DEFAULT '', PRIMARY KEY (`id`), FOREIGN KEY (`host_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (`participant_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`trade_id`) REFERENCES `trade` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
 SHOW INDEX FROM `offer`
--  INSERT INTO `user` (`id`,`username`,`email`,`password`,`first_name`,`last_name`,`pref_dark`,`profile_pic`) VALUES (?,?,?,?,?,?,?,?);
--  INSERT INTO `user` (`id`,`username`,`email`,`password`,`first_name`,`last_name`,`pref_dark`,`profile_pic`) VALUES (?,?,?,?,?,?,?,?);
--  INSERT INTO `user` (`id`,`username`,`email`,`password`,`first_name`,`last_name`,`pref_dark`,`profile_pic`) VALUES (?,?,?,?,?,?,?,?);
--  INSERT INTO `user` (`id`,`username`,`email`,`password`,`first_name`,`last_name`,`pref_dark`,`profile_pic`) VALUES (?,?,?,?,?,?,?,?);
--  INSERT INTO `user` (`id`,`username`,`email`,`password`,`first_name`,`last_name`,`pref_dark`,`profile_pic`) VALUES (?,?,?,?,?,?,?,?);
--  INSERT INTO `trade` (`id`,`user_id`,`title`,`content`,`seeking`,`picture`,`open`) VALUES (1,1,'Darkness Stout','Heavy 
-- as hell, fine as wine...',false,'https://res.cloudinary.com/beerbulliten/image/upload/v1630284036/lzgkisloxxwkxbymynye.jpg',true),(2,2,'Fruity IPA','Hints of orange and pomegranate, strong but mildly hoppy ',false,'https://res.cloudinary.com/beerbulliten/image/upload/v1630284049/axjkvslvnqz3prjaurlt.jpg',true),(3,2,'The Best Lager','Seriously a fine beer, waay better than Yuengling...',false,'https://res.cloudinary.com/beerbulliten/image/upload/v1630284070/gswae3zaoxmkykrlv1pn.jpg',true),(4,3,'Good Summer Ale','Excellent summer ale with a refreshing 
-- finish',false,'https://res.cloudinary.com/beerbulliten/image/upload/v1630284083/dthwn6xr8csybfvdfhjt.jpg',true),(5,5,'Natty Light','Bro i gotta get my Natty???',true,NULL,true),(6,1,'Ultra Rare Leggo Stout','...willing to make it worth your while',true,'https://res.cloudinary.com/beerbulliten/image/upload/v1630284097/h60duubsmkr7iwkpmlsl.png',true);
-- Executing (default): INSERT INTO `offer` (`id`,`host_id`,`participant_id`,`trade_id`,`resolved`,`endpoint`,`offer_money`,`offer_beer`,`offer_other`) VALUES (1,1,2,1,false,'1b1b2',5,'',''),(2,1,4,1,false,'1bt1b4',0,'a dozen Yuenglings',''),(3,2,3,2,false,'2b2b3',0,'','I\'ll mow 
-- your lawn duude...'),(4,2,1,3,false,'3b2b1',0,'rare IPA',''),(5,2,3,3,false,'3b2b3',0,'',''),(6,3,1,4,false,'4b3b1',2,'Three Philosophrs',''),(7,3,2,4,false,'4b3b2',0,'',''),(8,3,4,4,false,'4b3b4',2,'','i\'ll do your taxes'),(9,5,4,5,false,'5b5b4',0,'',''),(10,5,3,5,false,'5b5b3',0,'a case of Red Stripe',''),(11,1,2,6,false,'6b1b2',12,'',''),(12,1,5,6,false,'6b1b5',0,'','make your web app');


