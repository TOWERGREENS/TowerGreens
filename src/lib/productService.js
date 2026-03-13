// Products & Categories service
import insforge from './insforge'

export const productService = {
    async getAll({ category, search, limit = 50 } = {}) {
        let query = insforge.database
            .from('products')
            .select('*, categories(id, name_ur, name_en, slug)')
            .eq('is_available', true)
            .order('is_featured', { ascending: false })
            .order('created_at', { ascending: false })
            .limit(limit)

        if (category && category !== 'all') {
            const { data: cat } = await insforge.database
                .from('categories').select('id').eq('slug', category).maybeSingle()
            if (cat) query = query.eq('category_id', cat.id)
        }
        if (search) query = query.ilike('name_en', `%${search}%`)

        const { data, error } = await query
        if (error) throw error
        return data || []
    },

    async getById(id) {
        const { data, error } = await insforge.database
            .from('products')
            .select('*, categories(id, name_ur, name_en, slug)')
            .eq('id', id)
            .maybeSingle()
        if (error) throw error
        return data
    },

    async getFeatured(limit = 6) {
        const { data, error } = await insforge.database
            .from('products')
            .select('*')
            .eq('is_featured', true)
            .eq('is_available', true)
            .limit(limit)
        if (error) throw error
        return data || []
    },

    async getCategories() {
        const { data, error } = await insforge.database
            .from('categories')
            .select('*')
            .eq('is_active', true)
            .order('sort_order')
        if (error) throw error
        return data || []
    },

    // Admin
    async create(product) {
        const { data, error } = await insforge.database
            .from('products').insert([product]).select().maybeSingle()
        if (error) throw error
        return data
    },

    async update(id, updates) {
        const { data, error } = await insforge.database
            .from('products').update(updates).eq('id', id).select().maybeSingle()
        if (error) throw error
        return data
    },

    async delete(id) {
        const { error } = await insforge.database.from('products').delete().eq('id', id)
        if (error) throw error
    },
}
