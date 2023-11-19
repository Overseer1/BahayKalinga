import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAdminKey = process.env.REACT_APP_SERVICE_KEY
const supabaseAdmin = createClient(supabaseUrl, supabaseAdminKey, {auth: {autoRefreshToken: false, persistSession: false}})

export default supabaseAdmin