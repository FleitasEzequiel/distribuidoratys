'use client';

import React, { useState, useEffect } from "react";
import { CartItem } from "@/context/CartContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const handleWhatsAppRedirect = (producto: string, precio: number) => {
    const telefono = "549113704786682"; // Tu número de administrador

    const url = `https://wa.me/${telefono}`;

    window.open(url, '_blank');
};

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    deliveryMethod: 'pickup' | 'delivery';
    setDeliveryMethod: (method: 'pickup' | 'delivery') => void;
    cart: CartItem[];
    clearCart: () => void;
    totalPrice: number;
}

export function CheckoutModal({
    isOpen,
    onClose,
    deliveryMethod,
    setDeliveryMethod,
    cart,
    clearCart,
    totalPrice
}: CheckoutModalProps) {
    const [customerData, setCustomerData] = useState({
        firstName: '',
        lastName: '',
        document: '',
        phone: '',
        address: '',
        notes: '',
        accountNumber: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [whatsappUrl, setWhatsappUrl] = useState('');
    const [logoBase64, setLogoBase64] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setIsSuccess(false);
            setWhatsappUrl('');

            // Cargar logo en base64 para el PDF
            fetch('/logo.jpg')
                .then(res => res.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setLogoBase64(reader.result as string);
                    };
                    reader.readAsDataURL(blob);
                })
                .catch(err => console.error("Error al cargar el logo", err));
        }
    }, [isOpen]);

    const handleClose = () => {
        if (isSuccess) {
            clearCart();
        }
        setIsSuccess(false);
        onClose();
    };

    if (!isOpen) return null;

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Agregar logo si está disponible
        if (logoBase64) {
            doc.addImage(logoBase64, 'JPEG', 14, 12, 18, 18);
        }

        // Título con el color primario (#1764bb)
        doc.setFontSize(20);
        doc.setTextColor(23, 100, 187);
        doc.text("Pedido de Distribuidora TyS", logoBase64 ? 36 : 14, 24);

        // Volver a color de texto oscuro para los detalles (#0f172a - slate-900)
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(12);
        let currentY = 36;
        doc.text(`Cliente: ${customerData.firstName} ${customerData.lastName}`, 14, currentY); currentY += 7;
        doc.text(`DNI: ${customerData.document}`, 14, currentY); currentY += 7;
        doc.text(`Tel: ${customerData.phone}`, 14, currentY); currentY += 7;
        if (customerData.accountNumber) {
            doc.text(`Nº de Cuenta: ${customerData.accountNumber}`, 14, currentY); currentY += 7;
        }
        doc.text(`Entrega: ${deliveryMethod === 'pickup' ? 'Retiro en local' : 'Envío a domicilio'}`, 14, currentY); currentY += 7;
        if (deliveryMethod === 'delivery') {
            doc.text(`Dirección: ${customerData.address}`, 14, currentY); currentY += 7;
        }
        if (customerData.notes) {
            doc.text(`Notas: ${customerData.notes}`, 14, currentY); currentY += 7;
        }

        currentY += 5;

        const tableColumn = ["Producto", "Cant.", "Precio Un.", "Subtotal"];
        const tableRows: any[] = [];

        cart.forEach(item => {
            const itemData = [
                item.title,
                item.quantity.toString(),
                `$${item.price.toLocaleString('es-AR')}`,
                `$${(item.price * item.quantity).toLocaleString('es-AR')}`
            ];
            tableRows.push(itemData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: currentY,
            theme: 'grid',
            headStyles: { fillColor: [23, 100, 187] }, // Color primario (#1764bb)
            styles: { fontSize: 10, cellPadding: 3 },
            foot: [["", "", "Total:", `$${totalPrice.toLocaleString('es-AR')}`]],
            footStyles: { fillColor: [241, 245, 249], textColor: [15, 23, 42], fontStyle: 'bold' }
        });

        doc.save(`Pedido_${customerData.firstName}_${customerData.lastName}.pdf`);
    };

    const handleConfirm = () => {
        // En un caso real, el número de teléfono de la tienda debería estar aquí
        const STORE_PHONE = "5493704786682";

        handleDownloadPDF();

        let message = `*PEDIDO DE DISTRIBUIDORA TyS*\n\n`;
        message += `*Cliente:* ${customerData.firstName} ${customerData.lastName}\n`;
        message += `*DNI:* ${customerData.document}\n`;
        message += `*Tel:* ${customerData.phone}\n`;
        if (customerData.accountNumber) {
            message += `*Nº de Cuenta:* ${customerData.accountNumber}\n`;
        }
        message += `*Entrega:* ${deliveryMethod === 'pickup' ? 'Retiro en local' : 'Envío a domicilio'}\n`;
        if (deliveryMethod === 'delivery') {
            message += `*Dirección:* ${customerData.address}\n`;
        }
        if (customerData.notes) {
            message += `*Notas:* ${customerData.notes}\n`;
        }

        message += `\n*(Se generó y descargó un PDF con el detalle. Puedes adjuntarlo en este chat si lo deseas)*\n`;

        message += `\n*Detalle del Pedido:*\n`;
        cart.forEach(item => {
            message += `- ${item.title} (x${item.quantity}): $${(item.price * item.quantity).toLocaleString('es-AR')}\n`;
        });

        message += `\n*Total: $${totalPrice.toLocaleString('es-AR')}*`;

        const encodedMessage = encodeURIComponent(message);
        setWhatsappUrl(`https://wa.me/${STORE_PHONE}?text=${encodedMessage}`);
        setIsSuccess(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCustomerData((prev: typeof customerData) => ({ ...prev, [name]: value }));
    };

    return (
        <div aria-labelledby="modal-title" aria-modal="true" className="fixed inset-0 z-60 overflow-y-auto" role="dialog">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={handleClose}></div>
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-slate-100 dark:border-slate-800">
                    {isSuccess ? (
                        <div className="px-4 py-8 sm:p-12 text-center space-y-6">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">check_circle</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">¡Pedido generado con éxito!</h3>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Tu recibo se está descargando en este momento. Por favor, envíanos un mensaje por WhatsApp adjuntando el recibo descargado para coordinar el pago y la entrega.
                                </p>
                                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                                    ¿Tu recibo no se descargó? <button onClick={handleDownloadPDF} className="font-semibold text-primary hover:underline hover:text-primary/80 transition-colors">Descargar de nuevo</button>
                                </p>
                            </div>
                            <div className="pt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex justify-center rounded-lg bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#20bd5a] items-center gap-2 transition-colors"
                                    onClick={handleClose}
                                >
                                    <span className="material-symbols-outlined text-lg">chat</span>
                                    <span>Abrir chat de WhatsApp</span>
                                </a>
                                <button
                                    onClick={handleClose}
                                    className="inline-flex justify-center rounded-lg bg-white dark:bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="bg-white dark:bg-slate-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-slate-100 dark:border-slate-800 transition-colors">
                                <div className="sm:flex sm:items-start justify-between">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                        <h3 className="text-xl font-bold leading-6 text-slate-900 dark:text-white" id="modal-title">Finalizar Pedido</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Selecciona cómo deseas recibir tus productos.</p>
                                        </div>
                                    </div>
                                    <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-500">
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                            </div>
                            <div className="px-4 py-5 sm:p-6 space-y-6">
                                {/* Datos del Cliente */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-xl">person</span>
                                        Datos del Cliente
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200" htmlFor="firstName">Nombre</label>
                                            <div className="mt-1">
                                                <input
                                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 dark:text-white bg-white dark:bg-slate-800 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-colors"
                                                    id="firstName"
                                                    name="firstName"
                                                    placeholder="Ej: Juan"
                                                    type="text"
                                                    value={customerData.firstName}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200" htmlFor="lastName">Apellido</label>
                                            <div className="mt-1">
                                                <input
                                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 dark:text-white bg-white dark:bg-slate-800 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-colors"
                                                    id="lastName"
                                                    name="lastName"
                                                    placeholder="Ej: Pérez"
                                                    type="text"
                                                    value={customerData.lastName}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200" htmlFor="document">DNI / Documento</label>
                                            <div className="mt-1">
                                                <input
                                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 dark:text-white bg-white dark:bg-slate-800 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-colors"
                                                    id="document"
                                                    name="document"
                                                    placeholder="Número de documento"
                                                    type="text"
                                                    value={customerData.document}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200" htmlFor="phone">Teléfono de contacto</label>
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg">call</span>
                                                </div>
                                                <input
                                                    className="block w-full rounded-md border-0 py-2.5 pl-10 text-slate-900 dark:text-white bg-white dark:bg-slate-800 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-colors"
                                                    id="phone"
                                                    name="phone"
                                                    placeholder="+54 9 ..."
                                                    type="tel"
                                                    value={customerData.phone}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200" htmlFor="accountNumber">Número de cuenta (Opcional)</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg">account_balance_wallet</span>
                                            </div>
                                            <input
                                                className="block w-full rounded-md border-0 py-2.5 pl-10 text-slate-900 dark:text-white bg-white dark:bg-slate-800 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-colors"
                                                id="accountNumber"
                                                name="accountNumber"
                                                placeholder="Ej: 123456789"
                                                type="text"
                                                value={customerData.accountNumber}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Método de Entrega */}
                                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-xl">local_shipping</span>
                                        Método de Entrega
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <label
                                            onClick={() => setDeliveryMethod('pickup')}
                                            className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm focus:outline-none transition-all ${deliveryMethod === 'pickup' ? 'border-2 border-primary bg-primary/5 dark:bg-primary/10' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary/50'}`}
                                        >
                                            <input className="sr-only" name="delivery-method" type="radio" checked={deliveryMethod === 'pickup'} readOnly />
                                            <span className="flex flex-1">
                                                <span className="flex flex-col">
                                                    <span className="material-symbols-outlined text-primary mb-2 text-3xl">store</span>
                                                    <span className="block text-sm font-bold text-slate-900 dark:text-white">Pasar a retirar</span>
                                                    <span className="mt-1 flex items-center text-xs text-slate-500 dark:text-slate-400">Al frente de donde estaba el chino</span>
                                                    <span className="mt-1 text-xs font-medium text-primary">Gratis</span>
                                                </span>
                                            </span>
                                            {deliveryMethod === 'pickup' && (
                                                <span className="absolute top-4 right-4 h-4 w-4 rounded-full border border-primary bg-primary flex items-center justify-center">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                                                </span>
                                            )}
                                        </label>
                                        <label
                                            onClick={() => setDeliveryMethod('delivery')}
                                            className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm focus:outline-none transition-all ${deliveryMethod === 'delivery' ? 'border-2 border-primary bg-primary/5 dark:bg-primary/10' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary/50'}`}
                                        >
                                            <input className="sr-only" name="delivery-method" type="radio" checked={deliveryMethod === 'delivery'} readOnly />
                                            <span className="flex flex-1">
                                                <span className="flex flex-col">
                                                    <span className="material-symbols-outlined text-primary mb-2 text-3xl">local_shipping</span>
                                                    <span className="block text-sm font-bold text-slate-900 dark:text-white">Envío a domicilio</span>
                                                    <span className="mt-1 flex items-center text-xs text-slate-500 dark:text-slate-400">Entrega en 24-48hs</span>
                                                    <span className="mt-1 text-xs font-medium text-primary">A coordinar</span>
                                                </span>
                                            </span>
                                            {deliveryMethod === 'delivery' && (
                                                <span className="absolute top-4 right-4 h-4 w-4 rounded-full border border-primary bg-primary flex items-center justify-center">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                                                </span>
                                            )}
                                        </label>
                                    </div>

                                    {deliveryMethod === 'delivery' && (
                                        <div className="pt-2 animate-fade-in-down">
                                            <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200" htmlFor="address">Dirección de envío</label>
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg">location_on</span>
                                                </div>
                                                <input
                                                    className="block w-full rounded-md border-0 py-2.5 pl-10 text-slate-900 dark:text-white bg-white dark:bg-slate-800 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-colors"
                                                    id="address"
                                                    name="address"
                                                    placeholder="Calle, número, depto, ciudad..."
                                                    type="text"
                                                    value={customerData.address}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200" htmlFor="notes">Notas adicionales o comentarios</label>
                                    <div className="mt-1">
                                        <textarea
                                            className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 dark:text-white bg-white dark:bg-slate-800 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-colors"
                                            id="notes"
                                            name="notes"
                                            placeholder="Ej: Tocar timbre, dejar en recepción, horario de entrega..."
                                            rows={2}
                                            value={customerData.notes}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-4 sm:flex sm:flex-row-reverse sm:px-6 gap-3 border-t border-slate-100 dark:border-slate-800 transition-colors">
                                <button
                                    onClick={handleConfirm}
                                    className="inline-flex w-full justify-center rounded-lg bg-primary px-3 py-3 text-sm font-bold text-white shadow-sm hover:bg-primary/90 sm:w-auto transition-all items-center gap-2"
                                    type="button"
                                >
                                    <span>Confirmar y enviar</span>
                                    <span className="material-symbols-outlined text-lg">send</span>
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="mt-3 inline-flex w-full justify-center rounded-lg bg-white dark:bg-slate-800 px-3 py-3 text-sm font-semibold text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 sm:mt-0 sm:w-auto transition-colors"
                                    type="button"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
