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

export const getCategorias = async () => {
    'use cache'
    cacheTag('categories-tag')

    const { data: categorias, error } = await supabase
        .from('categoria')
        .select('id, nombre')
        .order('nombre', { ascending: true });

    if (error) throw new Error('Error al cargar categorias');

    // Siempre agregamos la categoría "Todo" con ID 0 para la navegación
    const categoriasConTodo = [{ id: 0, nombre: "Todo" }, ...(categorias || [])];

    return {
        data: categoriasConTodo
    };
}


export default getProducts