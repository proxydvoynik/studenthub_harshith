document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    const fallbackQuote = {
        quote: "Simplicity is the ultimate sophistication.",
        author: "Leonardo da Vinci"
    };

    const fetchQuote = () => {
        quoteText.textContent = "Loading quote...";
        quoteAuthor.textContent = "";

        fetch('https://dummyjson.com/quotes/random')
            .then(response => {
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                return response.json();
            })
            .then(data => {
                quoteText.textContent = `"${data.quote}"`;
                quoteAuthor.textContent = `- ${data.author}`;
            })
            .catch(() => {
                // Fallback if request fails
                quoteText.textContent = `"${fallbackQuote.quote}"`;
                quoteAuthor.textContent = `- ${fallbackQuote.author}`;
            });
    };

    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', fetchQuote);
    }

    // Load initial quote
    fetchQuote();
});
