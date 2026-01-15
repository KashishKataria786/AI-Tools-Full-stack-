import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import CreatePageDropDown from '../components/CreatePageDropDown';
import { BiSolidError } from 'react-icons/bi';

const CreatePost = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
    model: 'stable-diffusion-2-1'
  });

  const [loading, setLoading] = useState(false);
  const [generatingImg, setGeneratingImg] = useState(false);
  const [errorHandler, setErrorHandler] = useState({
    isError: false,
    status: ''
  });

  const models = [
    'gemini',
    'openai',
    'stable-diffusion-2-1',
    'sdxl-wrong-lora'
  ];

  /* ---------------------------------------------
     MODEL → API ROUTING
  --------------------------------------------- */
  const getEndpointByModel = (model) => {
    if (model === 'gemini') return '/gemini';
    if (model === 'openai') return '/dalle';
    return '/hf'; // Stable Diffusion & HuggingFace
  };

  /* ---------------------------------------------
     HANDLERS
  --------------------------------------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  /* ---------------------------------------------
     IMAGE GENERATION
  --------------------------------------------- */
  const generateImage = async () => {
    if (!form.prompt || !form.model) {
      toast.error('Please enter a prompt and select a model');
      return;
    }

    setGeneratingImg(true);
    setErrorHandler({ isError: false, status: '' });

    try {
      const endpoint = getEndpointByModel(form.model);

      const response = await axios.post(`${BASE_URL}${endpoint}`, {
        prompt: form.prompt,
        model: form.model
      });

      setForm((prev) => ({
        ...prev,
        photo: response.data.image
      }));
    } catch (error) {
      console.error(error);
      setErrorHandler({
        isError: true,
        status: error?.response?.status || '500'
      });
      toast.error('Failed to generate image');
    } finally {
      setGeneratingImg(false);
    }
  };

  /* ---------------------------------------------
     SUBMIT (SHARE POST)
  --------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.prompt || !form.photo) {
      toast.error('Please generate an image before sharing');
      return;
    }

    setLoading(true);

    try {
      const blob = await fetch(form.photo).then((res) => res.blob());
      const file = new File([blob], `${form.name}.jpg`, {
        type: 'image/jpeg'
      });

      const formData = new FormData();
      formData.append('photoFile', file);
      formData.append('name', form.name);
      formData.append('prompt', form.prompt);
      formData.append('model', form.model);

      await fetch(`${BASE_URL}/post`, {
        method: 'POST',
        body: formData
      });

      toast.success('Shared successfully!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Error while sharing post');
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------------------
     UI
  --------------------------------------------- */
  return (
    <section className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="font-extrabold text-4xl text-[#222328]">Create</h1>
        <p className="mt-2 text-[#666e75] text-lg max-w-md">
          Generate AI images and share them with the community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 max-w-3xl">
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A futuristic city at sunset..."
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="flex items-center gap-2">
            <p className="text-lg font-medium">Choose Model:</p>
            <CreatePageDropDown
              data={models}
              handleChange={handleChange}
              form={form}
              setForm={setForm}
            />
          </div>

          {/* IMAGE PREVIEW */}
          <div className="relative bg-gray-50 border rounded-lg w-[30rem] h-[30rem] flex justify-center items-center">
            {errorHandler.isError ? (
              <div className="text-center">
                <BiSolidError className="w-24 h-24 text-red-500 mx-auto" />
                <p>Error generating image</p>
                <p className="text-red-500">Code: {errorHandler.status}</p>
              </div>
            ) : form.photo ? (
              <img
                src={form.photo}
                alt="generated"
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader />
              </div>
            )}
          </div>
        </div>

        {/* GENERATE BUTTON */}
        <button
          type="button"
          onClick={generateImage}
          disabled={generatingImg}
          className="mt-4 bg-green-700 text-white px-6 py-2 rounded-md"
        >
          {generatingImg ? 'Generating...' : 'Generate'}
        </button>

        {/* SHARE BUTTON */}
        <div className="mt-8">
          <p className="text-sm text-[#666e75]">
            Once generated, you can share it with the community
          </p>
          <button
            type="submit"
            className="mt-3 bg-[#6469ff] text-white px-6 py-2 rounded-md"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
