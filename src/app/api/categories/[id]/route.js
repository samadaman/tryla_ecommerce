export async function GET(request, { params }) {
  try {
    const { id } = params;
    const response = await fetch('http://localhost:4000/categories/');
    
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const categories = await response.json();
    const category = categories.find(cat => cat.id === id);

    if (!category) {
      return new Response(JSON.stringify({ error: 'Category not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(category), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
