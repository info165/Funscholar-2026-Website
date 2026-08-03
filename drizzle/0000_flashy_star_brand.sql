CREATE TABLE `blogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(200) NOT NULL,
	`category` varchar(80) NOT NULL,
	`excerpt` text NOT NULL,
	`content` text,
	`read_time` varchar(40) NOT NULL DEFAULT '5 min read',
	`thumbnail_url` varchar(400),
	`thumbnail_data` longblob,
	`thumbnail_mime` varchar(100),
	`published` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `blogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`email` varchar(190) NOT NULL,
	`organization` varchar(190),
	`message` text NOT NULL,
	`is_read` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
