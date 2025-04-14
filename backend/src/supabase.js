const {createClient} = require('@supabase/supabase-js');

require('dotenv').config();

const projectUrl = process.env.SUPABASE_PROJECT_URL;
const apiKey = process.env.SUPABASE_API_KEY;

async function retrieveEmails() {
    const supabase = createClient(projectUrl, apiKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
        }
    });
    
    const adminAuthClient = supabase.auth.admin;

    const {data: {users}, error} = await adminAuthClient.listUsers({
        page: 1,
        perPage: 1000
    });

    if (error) {
        console.error('Error retrieving users:', error.message);
        return;
    }
    console.log(users)
    const emails = users.map(user => user.email);
    // return emails;
    return [];
}

module.exports = { retrieveEmails };

