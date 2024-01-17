export const ColorPicker = ({ calendarEvent }) => {
  const colors = ['blue', 'red', 'green', 'yellow'];

  const colorVariants = {
    'blue': {
      bg: 'bg-blue-400', ring: 'ring-blue-400'
    },
    'red': {
      bg: 'bg-red-400', ring: 'ring-red-400'
    },
    'green': {
      bg: 'bg-green-400', ring: 'ring-green-400'
    },
    'yellow': {
      bg: 'bg-yellow-400', ring: 'ring-yellow-400'
    },
  };

  const colorRadios = colors.map((color) =>
    <label key={color} className='cursor-pointer group'>
      <input type="radio" name="color" value={color} className='hidden peer'
        checked={calendarEvent.color === color}
        onChange={(event) => calendarEvent.set({ color: event.target.value })}
      />
      <div className={`h-6 w-6 group-hover:scale-125 peer-checked:ring-2 ring-offset-[3px] rounded-full transition-all ${colorVariants[color].bg} ${colorVariants[color].ring}`}></div>
    </label>
  );

  return (
    <div className="flex gap-5 items-center">
      {colorRadios}
    </div>
  );
};