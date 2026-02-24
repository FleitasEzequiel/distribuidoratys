'use server'

import { updateTag } from 'next/cache';
import { createClient } from '@/lib/supabase/client';

const supabase = await createClient();

async function uploadImage(file: File, id: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${id}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('Distribuidora TyS')
        .upload(filePath, file, {
            upsert: true,
            cacheControl: "3600",
            contentType: file.type
        });

    if (uploadError) {
        console.log("hubo un error", uploadError)
        console.error("Error uploading image:", uploadError);
        return null;
    }

    const { data } = supabase.storage
        .from('Distribuidora TyS')
        .getPublicUrl(filePath);

    return data.publicUrl;
}

export async function editarProducto(id: string, formData: FormData) {
    const nuevosDatos: any = {
        nombre: formData.get('nombre'),
        categoria_id: Number(formData.get('categoria')),
        precio: parseFloat(formData.get('precio') as string),
        descripcion: formData.get('descripcion'),

    };

    const file = formData.get('file') as File | null;
    if (file && file.size > 0) {
        const imageUrl = await uploadImage(file, id);
        if (imageUrl) {
            // nuevosDatos.imagen = imageUrl;
        }
    }

    const { error } = await supabase
        .from('productos')
        .update(nuevosDatos)
        .eq('id', id);

    console.log("debug", error)
    if (error) return { success: false };

    updateTag('products-tag');
    return { success: true };
}

export async function crearProducto(formData: FormData) {
    // We need an ID first to name the image file
    // So we create the product first, then update it if there's an image
    // OR we generate a UUID here if 'productos' table doesn't do it automatically

    const initialData: any = {
        nombre: formData.get('nombre'),
        categoria_id: Number(formData.get('categoria')),
        precio: parseFloat(formData.get('precio') as string),
        descripcion: formData.get('descripcion'),
    };

    const { data, error } = await supabase
        .from('productos')
        .insert([initialData])
        .select();

    if (error || !data) return { success: false };

    const newProduct = data[0];
    const file = formData.get('file') as File | null;

    if (file && file.size > 0) {
        const imageUrl = await uploadImage(file, newProduct.id);
        if (imageUrl) {
            await supabase
                .from('productos')
                .update({ imagen: imageUrl })
                .eq('id', newProduct.id);
        }
    }

    updateTag('products-tag');
    return { success: true, data: newProduct };
}

export async function eliminarProducto(id: string) {
    const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', id);

    if (error) return { success: false };
    updateTag('products-tag');
    return { success: true };
}