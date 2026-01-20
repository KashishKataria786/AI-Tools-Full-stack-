import React from "react"
import { download } from "../assets"
import { downloadImage } from "../utils"

const Card = ({ _id, name, prompt, model, photo, answer }) => {

  // TEXT POST
  if (!photo && answer) {
    return (
      <div className="rounded-xl shadow-card text-[#10131f] p-5 bg-white border break-inside-avoid">
        <p className="text-sm font-semibold mb-2">Prompt</p>
        <p className="text-md font-semibold mb-4 opacity-90">{prompt}</p>

        <p className="text-sm font-semibold mb-2">Answer</p>
        <p className="text-sm opacity-90 leading-relaxed">{answer}</p>
      </div>
    )
  }

  // IMAGE POST
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card break-inside-avoid">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt?.slice(0, 80) || "Generated image"}
        loading="lazy"
      />

      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            {name && (
              <>
                <div className="w-7 h-7 rounded-full bg-green-700 flex justify-center items-center text-white text-xs font-bold">
                  {name}
                </div>
                <p className="text-white text-sm">{name}</p>
              </>
            )}
            {model && <p className="text-white text-sm">{model}</p>}
          </div>

          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent border-none"
          >
            <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Card)
