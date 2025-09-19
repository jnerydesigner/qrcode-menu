import Image from "next/image";

const BurgerDetails = () => {
  const ingredients = [
    { name: "Pão", icon: "🍞", color: "bg-amber-600" },
    { name: "Carne", icon: "🥩", color: "bg-amber-900" },
    { name: "Tomate", icon: "🍅", color: "bg-red-500" },
    { name: "Queijo", icon: "🧀", color: "bg-yellow-400" },
    { name: "Alface", icon: "🥬", color: "bg-teal-400" },
  ];

  return (
    <section className="max-w-md mx-auto bg-white shadow-2xl overflow-hidden animate-fade-in pt-4">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReUnQBvIVoqwM00SqshxYXf9nrJ-AT1jus3u-e6OicyyIXViSYR_OnLi5fh04f_8paZswdtHoAHL9YkIkzC6Lvirh6c8J-RlGEac13jw"
          alt="Hamburger"
          fill
          className="object-cover"
          priority
        />

        <button className="absolute top-5 left-5 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full text-white text-lg hover:bg-white/30 transition-all duration-300 hover:scale-110 z-10 cursor-pointer">
          ←
        </button>
      </div>
      <div className="p-8 relative">
        <div className="w-auto h-12 bg-gradient-to-r from-indigo-500 to-purple-600 px-4 flex justify-center items-center absolute z-20 -top-6 right-0 ">
          <p className="font-bold">Sanduiches</p>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Burger Bistro
        </h1>
        <div className="flex items-center justify-center text-red-500 text-sm font-medium mb-6">
          <span className="text-xs mr-1">❤</span>
          Hamburgueria da Vila
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl mb-8 border-l-4 border-orange-400">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Descrição
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Delicioso hambúrguer artesanal com ingredientes frescos e
            selecionados. Uma experiência gastronômica única que combina sabor
            tradicional com um toque especial da casa.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
            Ingredientes
          </h3>
          <div className="grid grid-cols-5 gap-4 justify-items-center">
            {ingredients.map((ingredient, index) => (
              <div
                key={ingredient.name}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-8 h-8 ${ingredient.color} rounded-full flex items-center justify-center text-white text-sm shadow-md`}
                >
                  {ingredient.icon}
                </div>
                <span className="text-xs text-gray-600 font-medium text-center">
                  {ingredient.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 text-center -mx-4">
        <div className="text-4xl font-bold mb-1">R$ 32,00</div>
        <div className="text-sm opacity-80">Preço do produto</div>
      </div>
    </section>
  );
};

export default BurgerDetails;
