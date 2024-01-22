import { Form } from './Form'

export const CalendarEventForm = ({ calendarEvent, onSubmit, children }) => {
  const selectColors = ['blue', 'red', 'green', 'yellow'];
  
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
  
  const colorRadios = selectColors.map((color) => 
    <label key={color} className='cursor-pointer group'>
      <input type="radio" name="color" value={color} className='hidden peer'
        checked={calendarEvent.color === color}
        onChange={(event) => calendarEvent.updateState({ color: event.target.value })}
      />
      <div className={`h-6 w-6 group-hover:scale-125 peer-checked:ring-2 ring-offset-[3px] rounded-full transition-all ${colorVariants[color].bg} ${colorVariants[color].ring}`}></div>
    </label>
  );

  return (
    <Form onSubmit={onSubmit}>
      <input type='text' name='title' placeholder='タイトル' autoFocus
        value={calendarEvent.title}
        onChange={(event) => calendarEvent.updateState({ title: event.target.value })}
      />
      
      <input type='text' name='description' placeholder='説明'
        value={calendarEvent.description}
        onChange={(event) => calendarEvent.updateState({ description: event.target.value })}
      />
      
      <div>
        <label htmlFor='startDate' className='font-ZenKurenaido font-extrabold'>予定開始日付</label>
        <input type='date' name='description' id='startDate'
          value={calendarEvent.startDate}
          onChange={(event) => calendarEvent.updateState({ startDate: event.target.value })}
        />
      </div>
      
      <div>
        <label htmlFor='endDate' className='font-ZenKurenaido font-extrabold'>予定終了日付</label>
        <input type='date' name='description' id='endDate'
          value={calendarEvent.endDate}
          onChange={(event) => calendarEvent.updateState({ endDate: event.target.value })}
        />
      </div>

      <div className='flex gap-5 items-center'>
        <label className='font-ZenKurenaido font-extrabold'>色</label>
        <div className="flex gap-5 items-center">
          {colorRadios}
        </div>
      </div>

      {children}
    </Form>
  );
};