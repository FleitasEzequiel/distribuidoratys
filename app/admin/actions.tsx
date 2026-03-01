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
    try {
        const file = formData.get('file') as File | null;
        if (file && file.size > 600 * 1024) {
            return { success: false, message: "La imagen es demasiado grande. El tamaño máximo permitido es 600KB." };
        }

        const nuevosDatos: any = {
            nombre: formData.get('nombre'),
            categoria_id: Number(formData.get('categoria')),
            precio: parseFloat(formData.get('precio') as string),
            descripcion: formData.get('descripcion'),
        };

        if (file && file.size > 0) {
            const imageUrl = await uploadImage(file, id);
            if (imageUrl) {
                // nuevosDatos.imagen = imageUrl;
            } else {
                return { success: false, message: "Hubo un error al procesar la imagen en el servidor." };
            }
        }

        const { error } = await supabase
            .from('productos')
            .update(nuevosDatos)
            .eq('id', id);

        if (error) return { success: false, message: error.message };

        updateTag('products-tag');
        return { success: true };
    } catch (error: any) {
        console.error("Error en editarProducto:", error);
        return { success: false, message: error.message || "Error inesperado o fallo de conexión al servidor." };
    }
}

export async function crearProducto(formData: FormData) {
    try {
        const file = formData.get('file') as File | null;
        if (file && file.size > 600 * 1024) {
            return { success: false, message: "La imagen es demasiado grande. El tamaño máximo permitido es 600KB." };
        }

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

        if (error || !data) return { success: false, message: error?.message || "Ocurrió un error al registrar el producto." };

        const newProduct = data[0];

        if (file && file.size > 0) {
            const imageUrl = await uploadImage(file, newProduct.id);
            if (imageUrl) {
                await supabase
                    .from('productos')
                    .update({ imagen: imageUrl })
                    .eq('id', newProduct.id);
            } else {
                return { success: false, message: "El producto se creó, pero la imagen falló al subirse." };
            }
        }

        updateTag('products-tag');
        return { success: true, data: newProduct };
    } catch (error: any) {
        console.error("Error en crearProducto:", error);
        return { success: false, message: error.message || "Error inesperado o fallo de conexión al servidor." };
    }
}

export async function eliminarProducto(id: string) {
    try {
        const { error } = await supabase
            .from('productos')
            .delete()
            .eq('id', id);

        if (error) return { success: false, message: error.message };
        updateTag('products-tag');
        return { success: true };
    } catch (error: any) {
        console.error("Error en eliminarProducto:", error);
        return { success: false, message: error.message || "Error inesperado al intentar eliminar el producto." };
    }
}