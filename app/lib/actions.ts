'use server'
import {revalidateTag} from "next/cache"
export interface State {
    message: string | null;
    errors: Record<string, string>;
}

export async function createFacility(state: State, formData: any): Promise<{ message: string | null; errors: Record<string, string> }> {
    try {
        const response = await fetch('http://localhost:4000/myfacilities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify((formData)),
        });
        // revalidateTag('myfacilities');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return { message: 'درخواست شما با موفقیت ارسال شد', errors: {} };
 
    } catch (error) {
        console.error('Error:', error);
        return { message: null, errors: { server: 'Something went wrong!' } };
    }
}



export const getMyFacilities=async()=>{
    try {
    const response = await fetch('http://localhost:4000/myfacilities',{
      cache:'no-cache',
      next:{
        // tags:['myfacilities'],
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
    }
   catch (error) {
    console.error('Error fetching facilities:', error);
    return [];
  }
}

