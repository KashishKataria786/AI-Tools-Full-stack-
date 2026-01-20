import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextareaAutosize from "react-textarea-autosize";
import { FiMessageSquare } from "react-icons/fi";
import toast from 'react-hot-toast'
import axios from 'axios';

export default function AskMeAnything() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    if (!question.trim()) return;
    if(question===""){
        toast.warn("Ask Anything !");
        return;
    }
    try {
        const ans = await axios.post(`${process.env.REACT_APP_BASE_URL}/askmeanything/ask`, { prompt:question });
        // if(!ans.succes){
        //     toast.error("Caanot generate text");
        //     return;
        // }
        console.log(ans);
        setAnswer(ans.data.data.content);
        toast.success("Answer Generated!");
    } catch(error){
        toast.error("Cannot generate answer!");
        return;
    }finally{
        setLoading(false);
    }
  };

  const shareToCommunity = async() => {
 

    try{
      const share = await axios.post(`${process.env.REACT_APP_BASE_URL}/post`, {
        prompt: question,
        answer: answer
      });
      toast.success("Shared to Community!");
    }catch(error){
      toast.error("Cannot Share to Community!");
      return;
    }
    
  };

  return (
    <div className="w-full flex flex-col items-center px-6">
      {/* Header */}
      <header className="w-full max-w-3xl text-center flex flex-col items-center">
        <h1 className="text-4xl font-extrabold leading-tight text-gray-900">
          Ask Anything with <br className="max-md:hidden" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-400">
            Artificial Intelligence
          </span>
        </h1>
        <h2 className="mt-4 text-gray-600 text-base max-w-2xl">
          Get instant AI-powered answers and share meaningful insights with the community.
        </h2>
      </header>

      {/* Input Section */}
      <section className="mt-16 w-full max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col justify-center items-center"
        >
          <div className="w-full relative group">
            <div
              className="absolute inset-y-0 left-2 my-1.5 flex w-10 items-center justify-center
              rounded border border-gray-200 text-gray-400 group-focus-within:border-gray-700
              group-focus-within:text-gray-700"
            >
              <FiMessageSquare />
            </div>

            <TextareaAutosize
              minRows={1}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask your question here…"
              required
              className="block w-full rounded-md border border-gray-200 bg-white
              py-2.5 pl-14 pr-12 text-sm shadow-lg resize-none overflow-y-hidden
              font-medium focus:border-black focus:outline-none"
            />

            <button
              type="submit"
              className="absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center
              rounded border border-gray-200 text-gray-400 hover:border-gray-700 hover:text-gray-700"
            >
              ↵
            </button>
          </div>
        </form>

        {/* Result */}
        <div className="my-10 w-full flex justify-center items-center">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-sm"
            >
              Thinking...
            </motion.div>
          )}

          <AnimatePresence>
            {!loading && answer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <h3 className="font-bold text-gray-700 text-xl mb-3">
                  AI Answer
                </h3>
                <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {answer}
                  </p>
                </div>

                <button
                  onClick={shareToCommunity}
                  className="mt-6 w-full rounded-lg border border-gray-300 py-3
                  text-sm font-medium text-gray-800 hover:bg-gray-100"
                >
                  Share with Community
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
