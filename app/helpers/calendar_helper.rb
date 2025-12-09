module CalendarHelper
  def today?(day)
    day == Date.current
  end

  def not_current_month?(classes)
    classes.include?('prev-month') || classes.include?('next-month')
  end

  def date_number_classes(day, td_classes)
    classes = 'block font-mono'

    classes << if not_current_month?(td_classes)
                 ' text-gray-500 opacity-60'

               elsif today?(day)
                 ' text-green-400 font-bold'

               else
                 ' text-gray-300'
               end

    classes
  end
end
