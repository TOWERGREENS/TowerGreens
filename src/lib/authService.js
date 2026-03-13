// Auth service — InsForge Auth
import insforge from './insforge'

export const authService = {
    async signUp({ email, password, name, phone }) {
        const { data, error } = await insforge.auth.signUp({ email, password, name })
        if (error) throw error
        return data
    },

    async verifyEmail({ email, otp }) {
        const { data, error } = await insforge.auth.verifyEmail({ email, otp })
        if (error) throw error
        return data
    },

    async resendVerificationEmail({ email }) {
        await insforge.auth.resendVerificationEmail({ email })
    },

    async signIn({ email, password }) {
        const { data, error } = await insforge.auth.signInWithPassword({ email, password })
        if (error) throw error
        return data
    },

    async signInWithGoogle(redirectTo) {
        await insforge.auth.signInWithOAuth({
            provider: 'google',
            redirectTo: redirectTo || `${window.location.origin}/app/home`,
        })
    },

    async signOut() {
        const { error } = await insforge.auth.signOut()
        if (error) throw error
    },

    async getCurrentSession() {
        const { data, error } = await insforge.auth.getCurrentSession()
        if (error) return null
        return data?.session || null
    },

    async sendPasswordReset({ email }) {
        await insforge.auth.sendResetPasswordEmail({ email })
    },

    async getProfile(userId) {
        const { data, error } = await insforge.database
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle()
        if (error) throw error
        return data
    },

    async updateProfile(updates) {
        const { data, error } = await insforge.database
            .from('profiles')
            .update(updates)
            .eq('id', updates.id)
            .select()
            .maybeSingle()
        if (error) throw error
        return data
    },

    async createProfile({ id, name, phone, role = 'customer' }) {
        const { data, error } = await insforge.database
            .from('profiles')
            .insert([{ id, name, phone, role }])
            .select()
            .maybeSingle()
        if (error) throw error
        return data
    },
}
