 import { Account, Avatars, Client, Databases, ID, Query, Storage, TablesDB} from  'react-native-appwrite';
import { CreateUserPrams, GetMenuParams, SignInParams, Category, User, MenuItem } from "@/type";

interface appwriteConfig {
    endpoint: string,
    projectId: string,
    platform: string,
    database: string,
    bucketId: string,
    userTableName: string,
    menuTableName: string,
    categoryTableName: string,
    customizationsTableName: string,
    menu_customizationsTableName: string
}

export const appwriteConfig: appwriteConfig  = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
    database: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
    userTableName: process.env.EXPO_PUBLIC_APPWRITE_USER_TABLE_NAME,
    menuTableName: process.env.EXPO_PUBLIC_APPWRITE_MENU_TABLE_NAME,
    categoryTableName: process.env.EXPO_PUBLIC_APPWRITE_CATEGORY_TABLE_NAME,
    customizationsTableName: process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_TABLE_NAME,
    menu_customizationsTableName: process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_TABLE_NAME
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserPrams) => {
    try {
        const userId = ID.unique();
        const newAccount = await account.create({userId, name, email, password})
        if(!newAccount) throw Error;

        await signIn({ email, password });
        console.log('User signed up.');

        const avatarUrl = avatars.getInitials({name});

        return await tablesDB.createRow({
            databaseId: appwriteConfig.database,
            tableId: appwriteConfig.userTableName,
            rowId: ID.unique(),
            data:{ email, name, avatar: avatarUrl }
        })
    } catch (e) {
        throw new Error(e as string);
    }
}

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession({email, password});
    } catch (e) {
        throw new Error(e as string);
    }
}


export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        console.log("currentAccount: ", currentAccount);
        console.log("currentAccount.email: ", currentAccount.email);
        if(!currentAccount) throw Error;
        console.log(`appwriteConfig.userTableName: ${appwriteConfig.userTableName}`);

        const response = await tablesDB.listRows<User>({
            databaseId: appwriteConfig.database,
            tableId: appwriteConfig.userTableName,
            queries: [Query.equal('email', currentAccount.email)]
        });

        response.rows.forEach(user => {
            console.log(`User: ${user.name} by ${user.email}`);
        });
        const currentUser = response.rows[0]
        console.log("currentUser: ", currentUser);
        if(!currentUser) throw Error;

        return currentUser //.documents[0];
    } catch (e) {
        console.log(e);
        throw new Error(e as string);
    }
}



export const getMenuItems = async ({ category, query, limit }: GetMenuParams) => {
    try {
        const queries: string[] = [];

        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));
        if(limit) queries.push(Query.limit(limit));
        console.log(`Queries: ${queries}`);

        const menus = await tablesDB.listRows<MenuItem>({
            databaseId: appwriteConfig.database,
            tableId: appwriteConfig.menuTableName,
            queries: queries.length > 0 ? queries : undefined,
        })

        return menus.rows;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCategories = async () => {
    try {
        const categories = await tablesDB.listRows<Category>({
            databaseId: appwriteConfig.database,
            tableId: appwriteConfig.categoryTableName,
        })

        return categories.rows;
    } catch (e) {
        throw new Error(e as string);
    }
}

