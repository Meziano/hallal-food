import {Account, Avatars, Browser, Client, Databases, ID, Query, Storage, TablesDB} from "appwrite"  ;
import {CreateUserPrams, GetMenuParams, SignInParams, User} from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
    database: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    userTableName: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_NAME,
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
//    .setPlatform(appwriteConfig.platform)

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

        /*const currentUser = await databases.listDocuments(
            appwriteConfig.database,
            appwriteConfig.userCollectionName,
            [Query.equal('accountId', currentAccount.$id)]
        )*/

        if(!currentUser) throw Error;

        return currentUser //.documents[0];
    } catch (e) {
        console.log(e);
        throw new Error(e as string);
    }
}


/*
export const getMenu = async ({ category, query }: GetMenuParams) => {
    try {
        const queries: string[] = [];

        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries,
        )

        return menus.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )

        return categories.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}
*/
