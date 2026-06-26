document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    const fallback = {
        quote: "To live is to risk it all; otherwise you’re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you…",
        author: "Richard Daniel Sanchez"
    };

    const loadQuote = async () => {
        if (!quoteText || !quoteAuthor) return;

        quoteText.textContent = "Loading quote...";
        quoteAuthor.textContent = "";

        try {
            const res = await fetch('https://dummyjson.com/quotes/random');
            if (!res.ok) throw new Error('API server returned error status');
            
            const data = await res.json();
            quoteText.textContent = `"${data.quote}"`;
            quoteAuthor.textContent = `- ${data.author}`;
        } catch (err) {
            console.error('Failed to load random quote:', err);
            quoteText.textContent = `"${fallback.quote}"`;
            quoteAuthor.textContent = `- ${fallback.author}`;
        }
    };

    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', loadQuote);
    }

    loadQuote();
});
