

import { supabase } from './SupabaseClient'; // Importa el cliente de Supabase
import { lanzarNotificacion } from './lanzarNotificacion';

export const realTime = () => {
    const productSubscription = supabase
        .channel('custom-all-channel')
        .on('postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'products'
            },
            (payload) => {
                const product = payload.new;
                if (product.stock < 5) {
                    lanzarNotificacion(product);
                }
            }
        ).subscribe();

    return productSubscription;
};
