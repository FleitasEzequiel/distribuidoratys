"use cache"

import { createClient } from "@/lib/supabase/client";
import { cacheTag } from "next/cache";
const supabase = await createClient();

export const getProducts = async (category?: number, page: number = 1, searchTerm?: string) => {
    'use cache'
    cacheTag('products-tag')

    const pageSize = 12;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let supabaseQuery = supabase
        .from('productos')
        .select('id,nombre,descripcion,precio,categoria (nombre,id)', { count: 'exact' })

    if (category && category !== 0) {
        supabaseQuery = supabaseQuery.eq('categoria_id', category);
    }

    if (searchTerm && searchTerm.trim() !== "") {
        supabaseQuery = supabaseQuery.ilike('nombre', `%${searchTerm.trim()}%`);
    }

    const { data, error, count } = await supabaseQuery.range(from, to);
    if (error) throw new Error('Error al cargar base de datos');

    return {
        data: data || [],
        count: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize)
    };
}



export default getProducts