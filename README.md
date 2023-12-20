<h1 align="center">TaskManager</h1>


## 🚩 Table of Contents

- [Introduction](#--introduction)
- [Installation](#--installation)
- [Development setup](#--development-setup)
- [Runnnig the projects](#--running-the-projects)
- [License](#--license)


## <img src="https://cdn-icons-png.flaticon.com/512/1436/1436664.png" width="25" height="25" style="padding-right:15px">  Introduction 

<p>
Welcome to the Task Manager app! This application is designed to help you organize and manage your tasks efficiently. The app is built using React Native [Expo] for the frontend and utilizes , zustand to manage the state at frontent , a Fastify backend server to handle data storage and retrieval with Prisma to handle the mysql database queries.

</p>



## <img src="https://cdn-icons-png.flaticon.com/512/814/814848.png" width="25" height="25" style="padding-right:15px">  Installation 


### 🔘 Cloning repository
1. On GitHub.com, navigate to the main page of the repository.
2. Above the list of files, click  Code.
3. Copy the URL for the repository.
4. Open Terminal.
5. Change the current working directory to the location where you want the cloned directory.
6. Type git clone, and then paste the URL you copied earlier.
```
git clone github.com/Faris-abukhader/taskManager
```
Press Enter to create your local clone
```
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
> Cloning into `taskManager`...
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remove: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.
```
<br/>


## <img src="https://cdn-icons-png.flaticon.com/512/814/814848.png" width="25" height="25" style="padding-right:15px">  Development setup

To set up this project you need to download NodeJs in your machine or if you have it make sure you have the latest version of it.

### 🔘 Checking up Node version
```
node -v
```

### 🔘 Downloading Node

> for Windows  


Download the windows installer from [NodeJs offical website](https://nodejs.org/en/download/) make sure you have download the latest version of NodeJs.
<br/>


> for Mac
- You can download NodeJs using brew CLI
```
brew install node
```
- You can download NodeJs mac version through [the offical website](https://nodejs.org/en/download/)
<br/>
<hr/>

### 🔘 Downloading Expo cli


To download and install the Expo CLI, you can follow these steps. Expo CLI is a command-line tool that helps you develop and manage Expo projects.


### Steps:

1. **Open a Terminal or Command Prompt:**
   - On macOS or Linux, you can use the Terminal.
   - On Windows, you can use the Command Prompt or PowerShell.

2. **Install Expo CLI globally:**
   ```bash
   npm install -g expo-cli
   ```

   This command installs the Expo CLI globally on your machine.

3. **Verify Installation:**
   To ensure that Expo CLI has been installed correctly, you can run the following command to display the version:

   ```bash
   expo --version
   ```

   You should see the version number of the Expo CLI.

<br/>
<hr/>


### 🔘 Install MySQL Server


Setting up a MySQL database involves several steps, including installing MySQL, creating a database, and configuring user access. Below are general instructions for setting up a MySQL database. Keep in mind that specific details might vary depending on your operating system.


1. **Windows:**
   - Download the MySQL Installer from the official MySQL website: [MySQL Installer](https://dev.mysql.com/downloads/installer/).
   - Follow the installation wizard to install MySQL Server. During the installation, you will be prompted to set a root password.

2. **macOS:**
   - You can use Homebrew to install MySQL on macOS. Open a Terminal and run the following commands:

     ```bash
     brew update
     brew install mysql
     ```

   - Follow any additional instructions provided by Homebrew.

3. **Linux (Ubuntu):**
   - On Ubuntu, you can use the following commands:

     ```bash
     sudo apt-get update
     sudo apt-get install mysql-server
     ```

   - During the installation, you will be prompted to set a root password.

### Start MySQL Server:

- **Windows:**
  - Start the MySQL service using the "Services" application or run `net start mysql` in a Command Prompt.

- **macOS and Linux:**
  - MySQL server should start automatically after installation. You can use the following command to start, stop, or restart the MySQL service:

    ```bash
    sudo service mysql start
    ```


### Connect to MySQL Server using a GUI Tool:

You can use MySQL GUI tools like MySQL Workbench or DBeaver to interact with your MySQL database visually.

1. Install a MySQL GUI tool of your choice.

2. Connect to the MySQL server using the tool.


### setting up Prisma ORM


Setting up Prisma with Fastify and a MySQL server involves several steps, including installing Prisma, configuring your database connection, and integrating it into your Fastify application. Below are general instructions. Keep in mind that specific details might vary depending on your project structure.


### 1. Migrate Prisma Schema to database:

The prisma is already designed for you , you can check the Prisma schema at /prisma/schema.prisma 

to migrate the schema run this command:

```bash
npx prisma migrate
```

<br/>
<hr/>



### 🔘 Downloading the packages

### 1. React native app 

Go to project direct where  <package.json> is exist and type in terminal :
```
npm install 
```


### 2. server

Go to project direct where  <package.json> is exist and type in terminal :
```
npm install
```
OR
```
bun install
```

bun is a new runtime tools for javascript , which way more faster than nodeJs , you may read more about bun [form here](https://bun.sh).
<br/>
<hr/>


## <img src="https://cdn-icons-png.flaticon.com/512/1436/1436664.png" width="25" height="25" style="padding-right:15px">  Running the projects 


### 1. server
move to project directory and run the next command :
```
bun dev
```
### 2. react native
move to project directory and run the next command:
```
npm run start
```


<br/>
<hr/>


## 📜 License

This software is licensed under the [MIT](https://github.com/Faris-abukhader/WFYB-frontend/blob/main/licence) © [FaRiS](https://github.com/Faris-abukhader).
