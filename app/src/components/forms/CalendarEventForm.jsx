import { Form } from './Form'

export const CalendarEventForm = ({ calendarEvent, onSubmit, children }) => {
  const selectColors = ['blue', 'red', 'green', 'yellow'];
  const colorRadios = selectColors.map((color) => {
    const bgClass = `bg-${color}-400`;
    const ringClass = `ring-${color}-400`;
    return (
      <label key={color} className='cursor-pointer group'>
        <input type="radio" name="color" value={color} className='hidden peer'
          checked={calendarEvent.color === color}
          onChange={(event) => calendarEvent.set({ color: event.target.value })}
        />
        <div className={`h-6 w-6 group-hover:scale-125 peer-checked:ring-2 ring-offset-[3px] rounded-full transition-all ${bgClass} ${ringClass}`}></div>
      </label>
    );
  });

  return (
    <Form onSubmit={onSubmit}>
      <input type='text' name='title' placeholder='タイトル' autoFocus
        value={calendarEvent.title}
        onChange={(event) => calendarEvent.set({ title: event.target.value })}
      />
      
      <input type='text' name='description' placeholder='説明'
        value={calendarEvent.description}
        onChange={(event) => calendarEvent.set({ description: event.target.value })}
      />
      
      <div>
        <label htmlFor='startDate' className='font-ZenKurenaido font-extrabold'>予定開始日付</label>
        <input type='date' name='description' id='startDate'
          value={calendarEvent.startDate}
          onChange={(event) => calendarEvent.set({ startDate: event.target.value })}
        />
      </div>
      
      <div>
        <label htmlFor='endDate' className='font-ZenKurenaido font-extrabold'>予定終了日付</label>
        <input type='date' name='description' id='endDate'
          value={calendarEvent.endDate}
          onChange={(event) => calendarEvent.set({ endDate: event.target.value })}
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