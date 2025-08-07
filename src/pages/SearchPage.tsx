// src/pages/SearchPage.tsx
import { useSearchParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import PageMeta from "../components/common/PageMeta"

const mockProducts = [
    { id: 1, name: "PUBG UC Top-Up - Cheap Price" },
    { id: 2, name: "Mobile Legends Account for Sale - Mythic Rank" },
    { id: 3, name: "MLBB Diamond Top-Up - Fast Delivery" },
    { id: 4, name: "Free Fire Diamond Top-Up" },
    { id: 5, name: "Roblox Robux Buy (Global & Myanmar)" },
    { id: 6, name: "Razer Gold Buy - Top-Up Game Credits" },
    { id: 7, name: "Steam Wallet Code - Buy Now" },
    { id: 8, name: "Game Store Myanmar - Zakari" },
    { id: 9, name: "PUBG ဗီလ်ယူစီ ဝယ်ရန် (မြန်မာ)" },
    { id: 10, name: "မိုဘိုင်းလီဂျန်န့်အကောင့် ဝယ်ရန်" },
    { id: 11, name: "Diamond Top-Up မြန်မာ" },
    { id: 12, name: "ဂိမ်းအကောင့် ဝယ်ရန် - Zakari Game Store" },
]


const SearchPage = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const query = searchParams.get("q") || ""
    const [results, setResults] = useState<typeof mockProducts>([])

    useEffect(() => {
        const filtered = mockProducts.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filtered)
    }, [query])

    return (
        <>
            <PageMeta title={`Search Results for "${query}" - Zakari Game Store`} description={`Search results for "${query}"`} />
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
                    <button
                        onClick={() => navigate("/")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        Home
                    </button>
                </div>

                {results.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600 text-lg">No results found for your search.</p>
                        <p className="text-gray-500 mt-2">Try searching with different keywords.</p>
                    </div>
                ) : (
                    <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {results.map((product) => (
                            <li
                                key={product.id}
                                className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer bg-white"
                            >
                                <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </>
    )
}

export default SearchPage
