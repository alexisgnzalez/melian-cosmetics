import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function run() {
    const email = process.argv[2];
    const password = process.argv[3];

    if (!email || !password) {
        console.error('Usage: node create-orders-collection.mjs <admin-email> <admin-password>');
        process.exit(1);
    }

    try {
        console.log('Authenticating as admin...');
        await pb.collection('_superusers').authWithPassword(email, password);

        console.log('Fetching existing "orders" collection...');
        let collection;
        try {
            collection = await pb.collections.getOne('orders');
        } catch (e) {
            // Collection doesn't exist
        }

        const schemaFields = [
            {
                name: 'cartItems',
                type: 'json',
                required: true,
            },
            {
                name: 'totalAmount',
                type: 'number',
                required: true,
            },
            {
                name: 'customerName',
                type: 'text',
                required: true,
            },
            {
                name: 'customerPhone',
                type: 'text',
                required: true,
            },
            {
                name: 'customerCity',
                type: 'text',
                required: true,
            },
            {
                name: 'deliveryMethod',
                type: 'select',
                required: true,
                values: ["delivery", "pickup"],
                maxSelect: 1,
            },
            {
                name: 'paymentMethod',
                type: 'select',
                required: true,
                values: ["Pago Móvil", "Binance", "Zinli", "Mony"],
                maxSelect: 1,
            },
            {
                name: 'status',
                type: 'select',
                required: true,
                values: ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"],
                maxSelect: 1,
            }
        ];

        if (collection) {
            console.log('Updating "orders" collection...');
            collection = await pb.collections.update('orders', {
                fields: schemaFields
            });
            console.log('Collection updated successfully!', collection.id);
        } else {
            console.log('Creating "orders" collection...');
            collection = await pb.collections.create({
                name: 'orders',
                type: 'base',
                listRule: '@request.auth.id != ""',
                viewRule: '@request.auth.id != ""',
                createRule: '',
                updateRule: '@request.auth.id != ""',
                deleteRule: '@request.auth.id != ""',
                fields: schemaFields
            });
            console.log('Collection created successfully!', collection.id);
        }
    } catch (err) {
        console.error('Failed to create collection:', err.response || err);
    }
}

run();
