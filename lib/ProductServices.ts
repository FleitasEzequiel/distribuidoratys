"use cache"

import { createClient } from "@/lib/supabase/client";
import { cacheTag } from "next/cache";
const supabase = await createClient();

export const getProducts = async (category?: number, page: number = 1) => {
    'use cache'
    cacheTag('products-tag')

    const pageSize = 12;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
        .from('productos')
        .select('id,nombre,descripcion,precio,categoria (nombre,id)', { count: 'exact' })
        .range(from, to);

    if (category && category !== 0) {
        query = query.eq('categoria_id', category);
    }

    const { data, error, count } = await query;
    if (error) throw new Error('Error al cargar base de datos');

    return {
        data: data || [],
        count: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize)
    };
}



export default getProducts