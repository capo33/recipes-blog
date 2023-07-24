import React from "react";

import { Recipe } from "../../interfaces/RecipeInterface";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Alert, Button } from "react-bootstrap";

type IngredientProps = {
  recipe: Recipe | null;
  inputValue: string;
  handleDelete: (ingredient: string) => void;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const Ingredients = ({
  recipe,
  handleDelete,
  handleClick,
  inputValue,
  setInputValue,
}: IngredientProps) => {
  return (
    <div>
      <div>
        <h1 className='text-lg leading-6 font-medium text-gray-900'>
          Ingredients
        </h1>
      </div>
      <section aria-labelledby='filter-heading'>
        {/* Active Ingredients */}
        <div className='bg-gray-50'>
          <div className='max-w-7xl mx-auto py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8'>
            <h3 className='text-xs font-semibold uppercase tracking-wide text-gray-500'>
              Ingredients
            </h3>

            <div
              aria-hidden='true'
              className='hidden w-px h-5 bg-gray-300 sm:block sm:ml-4'
            />

            <div className=' '>
              <div className=' '>
                <Alert variant='secondary'>
                  {recipe?.ingredients?.map((ingredient) => (
                        
                     <span
                       key={ingredient}
                      >
                       <span>{ingredient}</span>
                       <MdOutlineDeleteForever
                        onClick={() => handleDelete(ingredient)}
                        className='h-5 w-5 text-gray-400'
                        style={{ cursor: "pointer" }}
                        aria-hidden='true'
                      />
                     </span>
                   ))}
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby='products-heading'
        className='max-w-2xl mx-auto pt-4 pb-4 px-4 sm:pt-4 sm:pb-8 sm:px-6 lg:max-w-7xl lg:px-8'
      >
        <div className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          <div className='space-y-1'>
            <label
              htmlFor='add-ingredients'
              className='block text-sm font-medium text-gray-700'
            >
              Add Ingredients
            </label>
            <div className='flex'>
              <div className='flex-grow'>
                <input
                  type='text'
                  name='add-ingredients'
                  id='add-ingredients'
                  className='block shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-lg border border-gray-300 rounded-md'
                  placeholder='Enter an ingredient'
                  aria-describedby='add-ingredients'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <span className='ml-3'>
                <div className='col-12'>
                  <button
                    type='button'
                    className='btn btn-outline-primary'
                    id='addIngredientsBtn'
                    onClick={handleClick}
                  >
                    <AiOutlinePlus
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />{" "}
                    Ingredient
                  </button>
                </div>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ingredients;
