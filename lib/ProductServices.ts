"use cache"

import { createClient } from "@/lib/supabase/client";
import { cacheTag } from "next/cache";
const supabase = await createClient();

export const getProducts = async () => {
    'use cache'
    cacheTag('products-tag') // Asignamos la etiqueta

    const { data, error } = await supabase.from('productos').select('id,nombre,descripcion,precio,categoria (nombre,id)')
    console.log(error)
    if (error) throw new Error('Error al cargar base de datos de terceros')

    return data
}

export default getProducts