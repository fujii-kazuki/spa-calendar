class CalendarEventsController < ApplicationController
  before_action :authenticate_user!
  before_action :is_existing_calendar_event, only: [:update, :destroy]
  before_action :is_matching_login_user, only: [:update, :destroy]
    
  def index
    render json: current_user.calendar_events
  end

  def create
    calendar_event = current_user.calendar_events.new(calendar_event_params)
    calendar_event.save!
    render json: calendar_event
  end

  def update
    calendar_event = CalendarEvent.find(params[:id])
    calendar_event = calendar_event.update!(calendar_event_params)
    render json: calendar_event
  end

  def destroy
    calendar_event = CalendarEvent.find(params[:id])
    calendar_event.destroy!
  end

  private

  # ストロングパラメーター
  def calendar_event_params
    params.require(:calendar_event).permit(:title, :description, :start_date, :end_date)
  end

  # 予定の存在を確認
  def is_existing_calendar_event
    unless CalendarEvent.exists?(id: params[:id])
      render json: { errors: { fullMessages: ['不正な要求です。', '予定が見つかりません。'] } }, status: 400
    end
  end
  
  # ログインユーザーと予定を追加したユーザーが一致しているか確認
  def is_matching_login_user
    if current_user.id != CalendarEvent.find(params[:id]).user_id
      render json: { errors: { fullMessages: ['不正なアクセスです。', 'ユーザーが一致しません。'] } }, status: 401
    end
  end
end
