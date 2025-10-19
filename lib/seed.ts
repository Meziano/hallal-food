import { ID,  } from  'react-native-appwrite';
import {appwriteConfig, storage, tablesDB} from "./appwrite";

import dummyData from "./data";
import {Is} from "@sinclair/typebox/value/is";


interface Category {
    name: string;
    description: string;
}

interface Customization {
    name: string;
    price: number;
    type: "topping" | "side" | "size" | "crust" | string; // extend as needed
}

interface MenuItem {
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
    category_name: string;
    customizations: string[]; // list of customization names
}

interface DummyData {
    categories: Category[];
    customizations: Customization[];
    menu: MenuItem[];
}

// ensure dummyData has correct shape
const data = dummyData as DummyData;

async function clearAll(tableName: string): Promise<void> {
    const list = await tablesDB.listRows({
        databaseId: appwriteConfig.database,
        tableId: tableName
    });
    
    await Promise.all(
        // console.log('About to clear data from:', JSON.stringify(list, null, 2))
        list.rows.map((row) => {
            console.log(`About to delete row with id ${row.$id} from Table ${tableName}`)
            tablesDB.deleteRow({
                databaseId: appwriteConfig.database,
                tableId: tableName,
                rowId: row.$id
            })
        })
    )
}

async function clearStorage(): Promise<void> {
    const list = await storage.listFiles({bucketId: appwriteConfig.bucketId});

    await Promise.all(
        list.files.map((file) =>
            storage.deleteFile({bucketId: appwriteConfig.bucketId, fileId: file.$id})
        )
    );
}

async function getFileFromData(imageUrl: string): Promise<File> {
    if (imageUrl) {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const fileType = blob.type || 'image/png';
            const fileName = imageUrl.split("/").pop() || "";
            const fileExtension = fileName.split('.').pop();
            console.log(`filename: ${fileName}`)
            console.log(`fileExtension: ${fileExtension}`)
            // const truncatedFileName = fileName?.substring(0,100);*/
            return new File([blob], imageUrl.split("/").pop(), { type: fileType });
        } catch (error) {
            console.error(`An error has occurred: ${error}`);
            throw error;
        }
    }
}


async function uploadImageToStorage(imageUrl: string): Promise<URL> {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = await storage.createFile({
            bucketId: appwriteConfig.bucketId,
            fileId: ID.unique(),
            file: {name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`, type: blob.type, size: blob.size, uri: imageUrl}
        });
        console.log("file.id: ", file.$id);
        return storage.getFileViewURL(appwriteConfig.bucketId, file.$id);
    } catch (error: string) {
        console.error(`An error has occurred: ${error}`);
        throw error;
    }
}

async function seed(): Promise<void> {
    // 1. Clear all
    console.log("1. Clear all")
    console.log(`1.1 Clear data from table ${appwriteConfig.categoryTableName}`)
    await clearAll(appwriteConfig.categoryTableName);
    console.log(`${appwriteConfig.categoryTableName} cleared.`);
    console.log(`1.2 Clear data from table ${appwriteConfig.customizationsTableName}`)
    await clearAll(appwriteConfig.customizationsTableName);
    console.log(`${appwriteConfig.customizationsTableName} cleared.`);
    console.log(`1.3 Clear data from table ${appwriteConfig.menuTableName}`)
    await clearAll(appwriteConfig.menuTableName);
    console.log(`${appwriteConfig.menuTableName} cleared.`);
    console.log(`1.4 Clear data from table ${appwriteConfig.menu_customizationsTableName}`)
    await clearAll(appwriteConfig.menu_customizationsTableName);
    console.log(`${appwriteConfig.menu_customizationsTableName} cleared.`);
    console.log(`1.5 Clear data from Storage ${appwriteConfig.bucketId}`)
    await clearStorage();
    console.log(`Storage with '${appwriteConfig.bucketId}' cleared.`);

    // 2. Inserting data
    const categoryMap: Record<string, string> = {};
    const customizationMap: Record<string, string> = {};
    const menuMap: Record<string, string> = {};
    console.log("Initial:categoryMap: ", JSON.stringify(categoryMap))
    console.log("Initial: customizationMap: ", JSON.stringify(customizationMap))
    console.log("Initial: menuMap: ", JSON.stringify(menuMap))
    // 2.1 Inserting Categories
    console.log(`2.1 Inserting ${data.categories.length} Categories..`)
    for (const [index, cat] of data.categories.entries()) {
        console.log(`About to insert the ${index+1}. Category`, JSON.stringify(cat));
        const catRow = await tablesDB.createRow({
            databaseId: appwriteConfig.database,
            tableId: appwriteConfig.categoryTableName,
            rowId: ID.unique(),
            data:{ ... cat }
        })
        console.log("inserted: ", JSON.stringify(catRow));
        categoryMap[cat.name] = catRow.$id;
    }

    // 2.2 Inserting Customizations
    console.log(`2.2. Inserting ${data.customizations.length} Customizations..`)
    for (const [index, cus] of data.customizations.entries()) {
        console.log(`About to insert the ${index+1} Customization`, JSON.stringify(cus));
        const cusObj = { name: cus.name, price: cus.price, type: cus.type }
        const cusRow = await tablesDB.createRow({
            databaseId: appwriteConfig.database,
            tableId: appwriteConfig.customizationsTableName,
            rowId: ID.unique(),
            data:{ ... cusObj }
        })
        console.log("inserted: ", JSON.stringify(cusRow));
        customizationMap[cus.name] = cusRow.$id;
    }

    // 2.3. Inserting Menu Items & th
    console.log(`2.3.1. Inserting ${data.menu.length} Menu..`)

    for (const [index, item] of data.menu.entries()) {
        /*console.log(`About to upload ${item.image_url}..`)
        const uploadedImage = await uploadImageToStorage(item.image_url);
        console.log(`Image ${uploadedImage} uploaded`)*/
        const menuObj = {
            name: item.name,
            description: item.description,
            image_url: item.image_url,
            price: item.price,
            rating: item.rating,
            calories: item.calories,
            protein: item.protein,
            categories: categoryMap[item.category_name],
        }
        console.log(`About to insert the ${index+1} Menu:`, JSON.stringify(menuObj));
        const menuRow = await tablesDB.createRow({
            databaseId: appwriteConfig.database,
            tableId: appwriteConfig.menuTableName,
            rowId: ID.unique(),
            data: menuObj
            }
        );
        console.log("Inserted: ", JSON.stringify(menuRow));
        menuMap[item.name] = menuRow.$id;

        // 2.3.2 Inserting menu_customizations
        console.log(`2.3.2 Inserting ${item.customizations.length} Menu_Customizations for Menu ${item.name}`)
        for (const [index, cusName] of item.customizations.entries()) {
            console.log(`About to insert the ${index+1} Menu_Customization: `, JSON.stringify(cusName));
            const menuCustRow = await tablesDB.createRow({
                databaseId: appwriteConfig.database,
                tableId: appwriteConfig.menu_customizationsTableName,
                rowId: ID.unique(),
                data: {
                    menu: menuRow.$id,
                    customizations: customizationMap[cusName]
                }
            });
            console.log("Inserted: ", JSON.stringify(menuCustRow));
        }
    }
    console.log("Result: categoryMap: ", JSON.stringify(categoryMap))
    console.log("Result: customizationMap: ", JSON.stringify(customizationMap))
    console.log("Result: menuMap:", JSON.stringify(menuMap));
    console.log("✅ Seeding complete.");
}

export default seed;